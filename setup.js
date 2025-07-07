#!/usr/bin/env node

/**
 * WaveLink Setup Script
 * This script helps you set up the WaveLink application with Appwrite
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkEnvFile() {
  const envPath = path.join(__dirname, '.env');
  const envExamplePath = path.join(__dirname, '.env.example');
  
  if (!fs.existsSync(envPath)) {
    if (fs.existsSync(envExamplePath)) {
      log('📋 Copying .env.example to .env...', 'yellow');
      fs.copyFileSync(envExamplePath, envPath);
      log('✅ .env file created!', 'green');
    } else {
      log('❌ .env.example file not found!', 'red');
      return false;
    }
  } else {
    log('✅ .env file already exists', 'green');
  }
  
  return true;
}

function checkEnvVariables() {
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    log('❌ .env file not found!', 'red');
    return false;
  }
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'VITE_APPWRITE_URL',
    'VITE_APPWRITE_PROJECT_ID',
    'VITE_APPWRITE_DATABASE_ID',
    'VITE_APPWRITE_COLLECTION_ID',
    'VITE_APPWRITE_BUCKET_ID'
  ];
  
  const missingVars = [];
  const placeholderVars = [];
  
  requiredVars.forEach(varName => {
    const regex = new RegExp(`${varName}=(.*)`, 'i');
    const match = envContent.match(regex);
    
    if (!match) {
      missingVars.push(varName);
    } else if (match[1].includes('your_') || match[1].trim() === '') {
      placeholderVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    log('❌ Missing environment variables:', 'red');
    missingVars.forEach(varName => log(`   - ${varName}`, 'red'));
    return false;
  }
  
  if (placeholderVars.length > 0) {
    log('⚠️  Environment variables with placeholder values:', 'yellow');
    placeholderVars.forEach(varName => log(`   - ${varName}`, 'yellow'));
    log('\n📖 Please update these values in your .env file', 'yellow');
    log('📚 See APPWRITE_SETUP.md for detailed instructions', 'cyan');
    return false;
  }
  
  log('✅ All environment variables are configured!', 'green');
  return true;
}

function printSetupInstructions() {
  log('\n🚀 WaveLink Setup Instructions', 'bright');
  log('================================', 'cyan');
  
  log('\n1. 📋 Environment Setup:', 'blue');
  log('   ✅ .env file created');
  log('   📝 Update the values in .env with your Appwrite configuration');
  
  log('\n2. 🔧 Appwrite Setup:', 'blue');
  log('   📖 Follow the detailed guide in APPWRITE_SETUP.md');
  log('   🌐 Create project at https://cloud.appwrite.io');
  log('   🗄️  Set up database, collection, and storage bucket');
  
  log('\n3. 🧪 Test Configuration:', 'blue');
  log('   🚀 Start the app: npm run dev');
  log('   🔍 Open browser console and run: window.testAppwriteConnection()');
  
  log('\n4. 📚 Resources:', 'blue');
  log('   📖 README.md - Complete documentation');
  log('   🔧 APPWRITE_SETUP.md - Detailed Appwrite setup');
  log('   🐛 Use window.testAppwriteConnection() for debugging');
  
  log('\n🎉 Happy coding with WaveLink!', 'green');
}

function main() {
  log('🌊 WaveLink Setup Script', 'cyan');
  log('========================\n', 'cyan');
  
  // Check and create .env file
  if (!checkEnvFile()) {
    log('❌ Setup failed: Could not create .env file', 'red');
    process.exit(1);
  }
  
  // Check environment variables
  const envConfigured = checkEnvVariables();
  
  // Print setup instructions
  printSetupInstructions();
  
  if (!envConfigured) {
    log('\n⚠️  Setup incomplete: Please configure your environment variables', 'yellow');
    process.exit(1);
  }
  
  log('\n✅ Setup complete! You can now start the application.', 'green');
}

// Run the setup
main();
