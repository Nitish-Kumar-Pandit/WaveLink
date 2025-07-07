# CORS Configuration for WaveLink

## 🌐 Required CORS Settings in Appwrite Console

To fix image loading issues, make sure your Appwrite project has the correct CORS settings:

### 1. Go to Appwrite Console
- Navigate to your project
- Go to **Settings** → **CORS**

### 2. Add Frontend URLs
Add these URLs to your CORS settings:

```
http://localhost:5173
http://localhost:3000
http://127.0.0.1:5173
https://your-production-domain.com
```

### 3. Storage Bucket Permissions
Make sure your storage bucket has public read permissions:

1. Go to **Storage** → **Your Bucket**
2. Click on **Settings** → **Permissions**
3. Add permission: `read("any")`

### 4. File Upload Permissions
When uploading files, make sure to include public read permissions:

```javascript
const response = await storage.createFile(bucketId, 'unique()', file, [
  Permission.read(Role.any()) // Public read access
]);
```

### 5. Test Your Setup
Open browser console and run:
```javascript
window.testAppwriteConnection()
```

This will test:
- Database connection
- Storage access
- Image URL generation
- File permissions

### 6. Common Issues & Solutions

#### Issue: "CORS policy" error
**Solution**: Add your frontend URL to CORS settings

#### Issue: "File not found" or 404 errors
**Solution**: Check bucket permissions and file permissions

#### Issue: Images not loading
**Solution**: 
1. Check file permissions
2. Verify bucket ID in .env
3. Test URLs manually in browser

#### Issue: Upload works but display doesn't
**Solution**: Check if `getFilePreview()` or `getFileView()` returns valid URLs

### 7. Debug Commands
```javascript
// Test connection
window.testAppwriteConnection()

// Check specific image URL
console.log(appwriteService.getFilePreview('your-file-id'))
```
