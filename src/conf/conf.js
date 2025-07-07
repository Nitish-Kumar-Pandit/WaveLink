const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  tinymceAPI: String(import.meta.env.VITE_TINYMCE_API_KEY),
};

// Validate required environment variables
const requiredEnvVars = [
  'VITE_APPWRITE_URL',
  'VITE_APPWRITE_PROJECT_ID',
  'VITE_APPWRITE_DATABASE_ID',
  'VITE_APPWRITE_COLLECTION_ID',
  'VITE_APPWRITE_BUCKET_ID'
];

const missingVars = requiredEnvVars.filter(varName =>
  !import.meta.env[varName] || import.meta.env[varName] === 'undefined'
);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  console.error('Please check your .env file and ensure all required variables are set.');
  console.error('See APPWRITE_SETUP.md for setup instructions.');
}

export default conf;

