-- Enhanced RLS Policies with Audit Trails and Constraints
-- Inzicht Coach - Production Security

-- Add audit columns to all tables
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS login_count INTEGER DEFAULT 0;

-- Add data retention columns
ALTER TABLE daily_logs ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '2 years');
ALTER TABLE voice_journals ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days');
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '1 year');

-- Enhanced constraints
ALTER TABLE daily_logs ADD CONSTRAINT IF NOT EXISTS daily_logs_unique_user_date 
  UNIQUE (user_id, date);

ALTER TABLE daily_logs ADD CONSTRAINT IF NOT EXISTS daily_logs_reasonable_drinks 
  CHECK (drinks_count >= 0 AND drinks_count <= 50); -- Reasonable limit

ALTER TABLE voice_journals ADD CONSTRAINT IF NOT EXISTS voice_journals_reasonable_size
  CHECK (LENGTH(transcript) <= 10000); -- Limit transcript size

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_daily_logs_user_date_desc ON daily_logs(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_created_desc ON chat_messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_voice_journals_user_date_desc ON voice_journals(user_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_user_earned ON achievements(user_id, earned_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_points_user ON user_points(user_id);

-- Data retention function
CREATE OR REPLACE FUNCTION cleanup_expired_data()
RETURNS void AS $$
BEGIN
  -- Delete expired voice journals (after 30 days)
  DELETE FROM voice_journals WHERE expires_at < NOW();
  
  -- Delete expired chat messages (after 1 year) 
  DELETE FROM chat_messages WHERE expires_at < NOW();
  
  -- Delete expired daily logs (after 2 years)
  DELETE FROM daily_logs WHERE expires_at < NOW();
  
  -- Log cleanup
  INSERT INTO audit_log (action, table_name, details, created_at)
  VALUES ('cleanup', 'multiple', 'Automated data retention cleanup', NOW());
  
  RAISE NOTICE 'Data retention cleanup completed';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'insert', 'update', 'delete', 'login', 'export', etc.
  table_name TEXT NOT NULL,
  record_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Users can only see their own audit logs
CREATE POLICY "users_own_audit" ON audit_log FOR SELECT 
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Only system can insert audit logs
CREATE POLICY "system_audit_insert" ON audit_log FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

-- Rate limiting table
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  endpoint TEXT NOT NULL, -- 'ai-chat', 'voice-transcribe', etc.
  requests_count INTEGER DEFAULT 0,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  blocked_until TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, endpoint)
);

-- Enable RLS on rate limits
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Users can view their own rate limits
CREATE POLICY "users_own_rate_limits" ON rate_limits FOR SELECT 
  USING (auth.uid() = user_id);

-- Rate limiting function
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_user_id UUID,
  p_endpoint TEXT,
  p_max_requests INTEGER DEFAULT 50,
  p_window_minutes INTEGER DEFAULT 60
) RETURNS BOOLEAN AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get current rate limit data
  SELECT requests_count, rate_limits.window_start 
  INTO current_count, window_start
  FROM rate_limits 
  WHERE user_id = p_user_id AND endpoint = p_endpoint;

  -- If no record exists, create one
  IF NOT FOUND THEN
    INSERT INTO rate_limits (user_id, endpoint, requests_count, window_start)
    VALUES (p_user_id, p_endpoint, 1, NOW());
    RETURN TRUE;
  END IF;

  -- Check if window has expired
  IF window_start + (p_window_minutes || ' minutes')::INTERVAL < NOW() THEN
    -- Reset window
    UPDATE rate_limits 
    SET requests_count = 1, window_start = NOW(), blocked_until = NULL
    WHERE user_id = p_user_id AND endpoint = p_endpoint;
    RETURN TRUE;
  END IF;

  -- Check if user is blocked
  IF (SELECT blocked_until FROM rate_limits WHERE user_id = p_user_id AND endpoint = p_endpoint) > NOW() THEN
    RETURN FALSE;
  END IF;

  -- Check if limit exceeded
  IF current_count >= p_max_requests THEN
    -- Block user for 15 minutes
    UPDATE rate_limits 
    SET blocked_until = NOW() + INTERVAL '15 minutes'
    WHERE user_id = p_user_id AND endpoint = p_endpoint;
    RETURN FALSE;
  END IF;

  -- Increment counter
  UPDATE rate_limits 
  SET requests_count = requests_count + 1
  WHERE user_id = p_user_id AND endpoint = p_endpoint;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log user activities
CREATE OR REPLACE FUNCTION log_user_activity(
  p_user_id UUID,
  p_action TEXT,
  p_table_name TEXT DEFAULT '',
  p_record_id UUID DEFAULT NULL,
  p_details JSONB DEFAULT '{}'::JSONB
) RETURNS void AS $$
BEGIN
  INSERT INTO audit_log (user_id, action, table_name, record_id, details)
  VALUES (p_user_id, p_action, p_table_name, p_record_id, p_details);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;