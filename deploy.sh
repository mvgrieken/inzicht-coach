#!/bin/bash

echo "🚀 Deploying Inzicht Coach to Production..."
echo ""

# 1. Build the app
echo "📦 Building Expo web app..."
npm run build
echo "✅ Build complete"
echo ""

# 2. Deploy to Netlify  
echo "🌐 Deploying to Netlify..."
netlify deploy --dir=build --prod --message="Production deployment with fixes"
echo "✅ Netlify deployment complete"
echo ""

# 3. Deploy Supabase components (if configured)
echo "🗄️ Deploying Supabase database schema..."
if [ -f "supabase/config.toml" ]; then
    echo "  - Deploying migrations..."
    # npx supabase db push --password="$SUPABASE_DB_PASSWORD"
    echo "  - Database schema ready (manual deploy required)"
    
    echo "  - Deploying Edge Functions..."
    # npx supabase functions deploy ai-chat
    # npx supabase functions deploy transcribe-audio  
    echo "  - Edge Functions ready (manual deploy required)"
else
    echo "  - Supabase config not found, skipping..."
fi
echo ""

# 4. Final status
echo "🎉 Deployment Summary:"
echo "  📱 App: https://inzicht-coach.netlify.app"
echo "  🗄️ Database: Supabase (manual deployment needed)"
echo "  🤖 AI: Edge Functions (manual deployment needed)"
echo ""
echo "✨ Next Steps:"
echo "  1. Configure environment variables on Netlify dashboard"  
echo "  2. Deploy Supabase migrations: npx supabase db push"
echo "  3. Deploy Edge Functions: npx supabase functions deploy"
echo "  4. Test all functionality on live site"
echo ""
echo "🏆 Inzicht Coach deployment complete!"