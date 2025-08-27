-- Function to update user points and calculate streaks
CREATE OR REPLACE FUNCTION update_user_points(
  p_user_id UUID,
  p_points_to_add INTEGER DEFAULT 0
) RETURNS void AS $$
DECLARE
  v_current_streak INTEGER;
  v_longest_streak INTEGER;
  v_total_alcohol_free_days INTEGER;
BEGIN
  -- Calculate current streak
  WITH streak_calc AS (
    SELECT 
      COALESCE(
        (
          SELECT COUNT(*)
          FROM daily_logs 
          WHERE user_id = p_user_id 
            AND drinks_count <= 2
            AND date >= (
              SELECT COALESCE(
                (
                  SELECT date + 1 
                  FROM daily_logs 
                  WHERE user_id = p_user_id 
                    AND drinks_count > 2
                  ORDER BY date DESC 
                  LIMIT 1
                ),
                '1900-01-01'::date
              )
            )
        ), 0
      ) as current_streak
  ),
  total_calc AS (
    SELECT 
      COUNT(*) FILTER (WHERE drinks_count = 0) as alcohol_free_days
    FROM daily_logs 
    WHERE user_id = p_user_id
  )
  SELECT 
    streak_calc.current_streak,
    total_calc.alcohol_free_days
  INTO 
    v_current_streak,
    v_total_alcohol_free_days
  FROM streak_calc, total_calc;

  -- Calculate longest streak
  WITH RECURSIVE streak_groups AS (
    SELECT 
      date,
      drinks_count <= 2 as within_goal,
      ROW_NUMBER() OVER (ORDER BY date) - 
      ROW_NUMBER() OVER (PARTITION BY drinks_count <= 2 ORDER BY date) as grp
    FROM daily_logs 
    WHERE user_id = p_user_id
    ORDER BY date
  ),
  streak_lengths AS (
    SELECT 
      COUNT(*) as streak_length
    FROM streak_groups
    WHERE within_goal = true
    GROUP BY grp
  )
  SELECT COALESCE(MAX(streak_length), 0)
  INTO v_longest_streak
  FROM streak_lengths;

  -- Update or insert user points
  INSERT INTO user_points (
    user_id, 
    points, 
    streak_days, 
    longest_streak, 
    total_alcohol_free_days
  )
  VALUES (
    p_user_id,
    p_points_to_add,
    v_current_streak,
    GREATEST(v_longest_streak, v_current_streak),
    v_total_alcohol_free_days
  )
  ON CONFLICT (user_id) DO UPDATE SET
    points = user_points.points + p_points_to_add,
    streak_days = v_current_streak,
    longest_streak = GREATEST(user_points.longest_streak, v_longest_streak, v_current_streak),
    total_alcohol_free_days = v_total_alcohol_free_days,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;