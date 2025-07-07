# WaveLink Appwrite Setup Guide

This guide will help you set up Appwrite backend for the WaveLink blog application.

## Prerequisites

1. Create an Appwrite account at [https://cloud.appwrite.io](https://cloud.appwrite.io)
2. Or set up a self-hosted Appwrite instance

## Step 1: Create a New Project

1. Log in to your Appwrite Console
2. Click "Create Project"
3. Enter project name: "WaveLink" or any name you prefer
4. Copy the **Project ID** - you'll need this for `.env`

## Step 2: Configure Platform

1. In your project dashboard, go to "Settings" → "Platforms"
2. Click "Add Platform" → "Web"
3. Enter your app details:
   - **Name**: WaveLink Web App
   - **Hostname**: `localhost` (for development)
   - **Port**: `5173` (Vite default port)
4. For production, add your production domain

## Step 3: Create Database

1. Go to "Databases" in the left sidebar
2. Click "Create Database"
3. Enter database name: "WaveLink_DB"
4. Copy the **Database ID** - you'll need this for `.env`

## Step 4: Create Collection for Blog Posts

1. Inside your database, click "Create Collection"
2. Enter collection name: "posts"
3. Copy the **Collection ID** - you'll need this for `.env`
4. Configure the following attributes:

### Required Attributes:
- **title** (String, required, size: 255)
- **content** (String, required, size: 65535)
- **featuredImage** (String, optional, size: 255)
- **status** (String, required, size: 20, default: "active")
- **userId** (String, required, size: 255)

### Indexes (for queries):
1. Create index for "status" field (for filtering active posts)
2. Create index for "userId" field (for user-specific posts)

## Step 5: Create Storage Bucket

1. Go to "Storage" in the left sidebar
2. Click "Create Bucket"
3. Enter bucket name: "images"
4. Configure permissions:
   - **Read**: Any
   - **Create**: Users
   - **Update**: Users
   - **Delete**: Users
5. Copy the **Bucket ID** - you'll need this for `.env`

## Step 6: Configure Authentication

1. Go to "Auth" in the left sidebar
2. Enable "Email/Password" authentication method
3. Configure security settings as needed

## Step 7: Update Environment Variables

Update your `.env` file with the IDs you copied:

```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_COLLECTION_ID=your_collection_id_here
VITE_APPWRITE_BUCKET_ID=your_bucket_id_here
VITE_TINYMCE_API_KEY=your_tinymce_api_key_here
```

## Step 8: Get TinyMCE API Key (Optional)

1. Go to [https://www.tiny.cloud](https://www.tiny.cloud)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

## Step 9: Test the Application

1. Run `npm run dev` or `bun dev`
2. Try creating an account
3. Try creating a blog post
4. Test file upload functionality

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure you've added your domain to the platform settings
2. **Permission Errors**: Check collection and bucket permissions
3. **Environment Variables**: Ensure all variables are properly set and restart the dev server

### Collection Permissions:
- **Read**: Any (for public blog reading)
- **Create**: Users (authenticated users can create posts)
- **Update**: Users (users can update their own posts)
- **Delete**: Users (users can delete their own posts)

## Security Notes

- Never commit your `.env` file to version control
- Use different projects for development and production
- Regularly review and update permissions
- Enable rate limiting in production

## Next Steps

Once everything is set up:
1. Test user registration and login
2. Create sample blog posts
3. Test image uploads
4. Configure production environment
5. Set up custom domains if needed
