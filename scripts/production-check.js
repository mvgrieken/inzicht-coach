#!/usr/bin/env node

/**
 * Production Readiness Check for Inzicht Coach
 * Runs pre-deployment validation
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Production Readiness Check for Inzicht Coach\n');

const checks = [];

// Check 1: Environment Variables
function checkEnvironmentVariables() {
  const envPath = path.join(__dirname, '../.env.local');
  const prodEnvPath = path.join(__dirname, '../.env.production');
  
  const requiredVars = [
    'EXPO_PUBLIC_SUPABASE_URL',
    'EXPO_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_KEY',
    'OPENAI_API_KEY',
    'ANTHROPIC_API_KEY'
  ];
  
  let hasEnv = fs.existsSync(envPath);
  let hasProdEnv = fs.existsSync(prodEnvPath);
  
  if (hasEnv && hasProdEnv) {
    return { status: '✅', message: 'Environment files present' };
  } else {
    return { status: '⚠️', message: 'Missing environment configuration files' };
  }
}

// Check 2: App Configuration
function checkAppConfig() {
  const appJsonPath = path.join(__dirname, '../app.json');
  
  if (!fs.existsSync(appJsonPath)) {
    return { status: '❌', message: 'app.json missing' };
  }
  
  const appConfig = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
  const expo = appConfig.expo;
  
  const issues = [];
  
  if (!expo.name || expo.name === 'inzicht-coach-app') {
    issues.push('App name needs to be set');
  }
  
  if (!expo.version) {
    issues.push('Version needs to be set');
  }
  
  if (!expo.ios?.bundleIdentifier) {
    issues.push('iOS bundle identifier missing');
  }
  
  if (!expo.android?.package) {
    issues.push('Android package name missing');
  }
  
  if (issues.length > 0) {
    return { status: '⚠️', message: `App config issues: ${issues.join(', ')}` };
  }
  
  return { status: '✅', message: 'App configuration complete' };
}

// Check 3: Assets
function checkAssets() {
  const assetsPath = path.join(__dirname, '../assets');
  const requiredAssets = [
    'icon.png',
    'adaptive-icon.png', 
    'splash-icon.png',
    'favicon.png'
  ];
  
  const missing = requiredAssets.filter(asset => 
    !fs.existsSync(path.join(assetsPath, asset))
  );
  
  if (missing.length > 0) {
    return { status: '❌', message: `Missing assets: ${missing.join(', ')}` };
  }
  
  return { status: '✅', message: 'All required assets present' };
}

// Check 4: Dependencies
function checkDependencies() {
  const packagePath = path.join(__dirname, '../package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const criticalDeps = [
    'expo',
    'react',
    'react-native',
    'expo-router',
    '@supabase/supabase-js',
    'tailwindcss',
    'twrnc'
  ];
  
  const missing = criticalDeps.filter(dep => !pkg.dependencies[dep]);
  
  if (missing.length > 0) {
    return { status: '❌', message: `Missing dependencies: ${missing.join(', ')}` };
  }
  
  return { status: '✅', message: 'All critical dependencies installed' };
}

// Check 5: Database Schema
function checkDatabaseSchema() {
  const migrationsPath = path.join(__dirname, '../supabase/migrations');
  
  if (!fs.existsSync(migrationsPath)) {
    return { status: '❌', message: 'Database migrations folder missing' };
  }
  
  const migrations = fs.readdirSync(migrationsPath).filter(f => f.endsWith('.sql'));
  
  if (migrations.length === 0) {
    return { status: '❌', message: 'No database migrations found' };
  }
  
  return { status: '✅', message: `${migrations.length} database migrations ready` };
}

// Run all checks
const allChecks = [
  { name: 'Environment Variables', check: checkEnvironmentVariables },
  { name: 'App Configuration', check: checkAppConfig },
  { name: 'Required Assets', check: checkAssets },
  { name: 'Dependencies', check: checkDependencies },
  { name: 'Database Schema', check: checkDatabaseSchema },
];

console.log('Running production readiness checks...\n');

allChecks.forEach(({ name, check }) => {
  const result = check();
  console.log(`${result.status} ${name}: ${result.message}`);
});

console.log('\n🚀 Production check complete!');
console.log('\nNext steps:');
console.log('1. Deploy Supabase Edge Functions: npx supabase functions deploy');
console.log('2. Build for production: eas build --platform all');
console.log('3. Test on physical devices before store submission');