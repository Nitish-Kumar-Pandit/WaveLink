# WaveLink Setup Checklist ✅

Use this checklist to ensure your WaveLink application is properly configured with Appwrite.

## 📋 Pre-Setup Requirements

- [ ] Node.js installed (v16+)
- [ ] Appwrite account created at [cloud.appwrite.io](https://cloud.appwrite.io)
- [ ] Git repository cloned locally

## 🔧 Step-by-Step Setup

### 1. Environment Configuration
- [ ] Run `npm run setup` to create .env file
- [ ] Open `.env` file in your editor
- [ ] Keep this file open while setting up Appwrite

### 2. Appwrite Project Setup
- [ ] Log in to [Appwrite Console](https://cloud.appwrite.io)
- [ ] Click "Create Project"
- [ ] Project Name: `WaveLink` (or your preferred name)
- [ ] **Copy Project ID** → Update `VITE_APPWRITE_PROJECT_ID` in .env

### 3. Platform Configuration
- [ ] Go to Settings → Platforms
- [ ] Click "Add Platform" → "Web"
- [ ] Name: `WaveLink Web App`
- [ ] Hostname: `localhost`
- [ ] Port: `5173`
- [ ] Click "Create"

### 4. Database Setup
- [ ] Go to "Databases" in sidebar
- [ ] Click "Create Database"
- [ ] Database Name: `WaveLink_DB`
- [ ] **Copy Database ID** → Update `VITE_APPWRITE_DATABASE_ID` in .env

### 5. Collection Setup
- [ ] Inside your database, click "Create Collection"
- [ ] Collection Name: `posts`
- [ ] **Copy Collection ID** → Update `VITE_APPWRITE_COLLECTION_ID` in .env

#### Collection Attributes (Add these one by one):
- [ ] `title` - String, Required, Size: 255
- [ ] `content` - String, Required, Size: 65535
- [ ] `featuredImage` - String, Optional, Size: 255
- [ ] `status` - String, Required, Size: 20, Default: "active"
- [ ] `userId` - String, Required, Size: 255

#### Collection Indexes:
- [ ] Create index for `status` field (Key: status_index)
- [ ] Create index for `userId` field (Key: userId_index)

#### Collection Permissions:
- [ ] Read: Any
- [ ] Create: Users
- [ ] Update: Users
- [ ] Delete: Users

### 6. Storage Setup
- [ ] Go to "Storage" in sidebar
- [ ] Click "Create Bucket"
- [ ] Bucket Name: `images`
- [ ] **Copy Bucket ID** → Update `VITE_APPWRITE_BUCKET_ID` in .env

#### Bucket Permissions:
- [ ] Read: Any
- [ ] Create: Users
- [ ] Update: Users
- [ ] Delete: Users

### 7. Authentication Setup
- [ ] Go to "Auth" in sidebar
- [ ] Enable "Email/Password" method
- [ ] Configure any additional security settings as needed

### 8. TinyMCE Setup (Optional)
- [ ] Go to [tiny.cloud](https://www.tiny.cloud)
- [ ] Create free account
- [ ] Get API key from dashboard
- [ ] **Copy API Key** → Update `VITE_TINYMCE_API_KEY` in .env

## 🧪 Testing Your Setup

### 1. Environment Check
```bash
npm run setup
```
Should show all green checkmarks.

### 2. Start Application
```bash
npm run dev
```
Application should start without errors.

### 3. Connection Test
- [ ] Open browser to `http://localhost:5173`
- [ ] Open browser console (F12)
- [ ] Run: `window.testAppwriteConnection()`
- [ ] All tests should pass ✅

### 4. Functionality Test
- [ ] Try creating an account
- [ ] Try logging in
- [ ] Try creating a blog post
- [ ] Try uploading an image

## 🐛 Troubleshooting

### Common Issues:

**Environment Variables Not Loading:**
- [ ] Restart dev server after updating .env
- [ ] Check for typos in variable names
- [ ] Ensure no extra spaces around values

**CORS Errors:**
- [ ] Verify localhost:5173 is added to platform settings
- [ ] Check Appwrite URL is correct

**Permission Errors:**
- [ ] Verify collection permissions are set correctly
- [ ] Check bucket permissions
- [ ] Ensure user is authenticated

**Connection Failures:**
- [ ] Verify all IDs are copied correctly
- [ ] Check Appwrite project is active
- [ ] Test internet connection

## 📝 Your Configuration Summary

Fill this out as you complete the setup:

```
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=_________________
VITE_APPWRITE_DATABASE_ID=_______________
VITE_APPWRITE_COLLECTION_ID=_____________
VITE_APPWRITE_BUCKET_ID=_________________
VITE_TINYMCE_API_KEY=____________________
```

## ✅ Final Verification

- [ ] All environment variables configured
- [ ] `npm run setup` shows all green
- [ ] `window.testAppwriteConnection()` passes all tests
- [ ] Can create account and login
- [ ] Can create and view blog posts
- [ ] Can upload images

## 🎉 Success!

Once all items are checked, your WaveLink application is ready to use!

## 📚 Additional Resources

- `README.md` - Complete documentation
- `APPWRITE_SETUP.md` - Detailed Appwrite guide
- [Appwrite Documentation](https://appwrite.io/docs)
- [React Documentation](https://react.dev)
