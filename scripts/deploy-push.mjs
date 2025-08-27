#!/usr/bin/env node
import { execSync } from 'node:child_process';

function sh(cmd) {
  return execSync(cmd, { stdio: 'inherit' });
}

function shOut(cmd) {
  return execSync(cmd, { stdio: 'pipe' }).toString().trim();
}

try {
  const branchArg = process.argv[2];
  const msgArg = process.argv.slice(3).join(' ').trim();
  const branch = branchArg || shOut('git rev-parse --abbrev-ref HEAD');
  const msg = msgArg || `chore: deploy (${new Date().toISOString()})`;

  console.log(`Branch: ${branch}`);
  const remote = shOut('git remote get-url origin');
  console.log(`Remote: ${remote}`);

  console.log('Staging changes...');
  sh('git add -A');

  // Check if there is anything to commit
  const status = shOut('git status --porcelain');
  if (!status) {
    console.log('No changes to commit. Pushing latest...');
  } else {
    console.log('Committing...');
    sh(`git commit -m "${msg.replace(/"/g, '\\"')}"`);
  }

  console.log('Pushing...');
  sh(`git push origin ${branch}`);
  console.log('Push complete. Netlify will deploy automatically.');
} catch (err) {
  console.error('\nDeploy push failed.');
  if (err?.message) console.error(err.message);
  console.error('\nTips:');
  console.error('- Zorg dat git is geconfigureerd met push-rechten (HTTPS/SSH).');
  console.error('- Controleer remote: git remote -v');
  console.error('- Probeer handmatig: git add -A && git commit -m "chore: deploy" && git push');
  process.exit(1);
}

