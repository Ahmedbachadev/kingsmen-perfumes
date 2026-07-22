const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'src', 'admin', 'features');

const dirsToCreate = [
  'reports',
  'system',
  'catalog',
  'sales',
  'content'
];

dirsToCreate.forEach(dir => {
  const dirPath = path.join(featuresDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created ${dir}`);
  }
});

const moves = [
  { from: 'analytics', to: 'reports/dashboard' },
  { from: 'sales-reports', to: 'reports/sales' },
  { from: 'product-analytics', to: 'reports/products' },
  { from: 'collection-analytics', to: 'reports/collections' },
  { from: 'financial-reports', to: 'reports/financial' },
  { from: 'export-center', to: 'reports/export-center' },
  { from: 'settings', to: 'system/settings' },
  { from: 'notifications', to: 'system/notifications' }
];

moves.forEach(({ from, to }) => {
  const fromPath = path.join(featuresDir, from);
  const toPath = path.join(featuresDir, to);
  
  if (fs.existsSync(fromPath)) {
    // If the target already exists, we skip or replace
    if (!fs.existsSync(toPath)) {
      // Create parent directory if needed
      fs.mkdirSync(path.dirname(toPath), { recursive: true });
      fs.renameSync(fromPath, toPath);
      console.log(`Moved ${from} to ${to}`);
    } else {
      console.log(`Target ${to} already exists, skipping ${from}`);
    }
  } else {
    console.log(`Source ${from} not found.`);
  }
});

// Rename marketing to marketing/dashboard
const marketingPath = path.join(featuresDir, 'marketing');
const marketingDashboardPath = path.join(featuresDir, 'marketing', 'dashboard');

if (fs.existsSync(marketingPath) && !fs.existsSync(marketingDashboardPath)) {
  const tempPath = path.join(featuresDir, 'temp_marketing');
  fs.renameSync(marketingPath, tempPath);
  fs.mkdirSync(marketingPath, { recursive: true });
  fs.renameSync(tempPath, marketingDashboardPath);
  console.log('Moved marketing contents to marketing/dashboard');
}

console.log('Restructuring complete.');
