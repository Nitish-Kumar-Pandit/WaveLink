import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket; //storage

  constructor() {
    try {
      this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
      this.databases = new Databases(this.client);
      this.bucket = new Storage(this.client);
    } catch (error) {
      console.error("Failed to initialize Appwrite client:", error);
      throw new Error("Appwrite configuration error. Please check your environment variables.");
    }
  }

  //slug is used as unique id for all docs
  async createPost({ title, slug, content, featuredImage, status, userId, category }) {
    try {
      // Ensure slug is valid for Appwrite document ID
      let validSlug = slug;

      // Validate and sanitize slug
      if (!validSlug || validSlug.length === 0) {
        validSlug = "post-" + Date.now().toString().slice(-8);
      }

      // Ensure slug meets Appwrite requirements
      validSlug = validSlug
        .replace(/[^a-zA-Z0-9-_.]/g, "")
        .substring(0, 36)
        .replace(/^[-_.]+|[-_.]+$/g, "");

      // Final fallback
      if (!validSlug || validSlug.length === 0) {
        validSlug = "post-" + Date.now().toString().slice(-8);
      }

      // Create document data without category field (since it doesn't exist in the database schema)
      const documentData = {
        title,
        content,
        featuredImage: featuredImage || null, // Handle case where featuredImage might be undefined
        status,
        userId,
      };

      console.log("Creating post with data:", documentData);

      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        validSlug,
        documentData
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      console.log("Error details:", {
        code: error.code,
        message: error.message,
        type: error.type,
        response: error.response
      });
      throw error; // Re-throw to handle in UI
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, category }) {
    try {
      // Create document data without category field (since it doesn't exist in the database schema)
      const documentData = {
        title,
        content,
        featuredImage: featuredImage || null, // Handle case where featuredImage might be undefined
        status,
      };

      console.log("Updating post with data:", documentData);

      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        documentData
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      console.log("Update error details:", {
        code: error.code,
        message: error.message,
        type: error.type,
        response: error.response
      });
      throw error; // Re-throw to handle in UI
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  //for applying queries we need to have indexing in the appwrite.
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  // file upload services

  async uploadFile(file) {
    try {
      console.log("🔄 Uploading file:", file.name, "Size:", file.size);

      const response = await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [
          Permission.read(Role.any()), // ✅ CRITICAL: Public read access for image display
          Permission.update(Role.any()), // Allow updates if needed
          Permission.delete(Role.any())  // Allow deletion if needed
        ]
      );

      console.log("✅ File uploaded successfully:", response);
      console.log("📁 File ID:", response.$id);

      // Test the preview URL immediately after upload
      const previewUrl = this.getFilePreview(response.$id);
      console.log("🖼️ Generated preview URL:", previewUrl);
      console.log("🌐 Test this URL manually in browser:", previewUrl);

      // Also test getFileView as alternative
      const viewUrl = this.getFileView(response.$id);
      console.log("📄 Alternative view URL:", viewUrl);

      return response;
    } catch (error) {
      console.error("❌ Appwrite service :: uploadFile :: error", error);
      console.error("📋 Upload error details:", {
        code: error.code,
        message: error.message,
        type: error.type,
        response: error.response,
        bucketId: conf.appwriteBucketId
      });
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

   //filePreview responses are very fast so there is no need to make it async
  getFilePreview(fileId) {
    if (!fileId) {
      console.log("❌ getFilePreview: No fileId provided");
      return null;
    }

    try {
      // Try getFilePreview first (for images with resizing)
      const previewUrl = this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId,
        400, // width
        300, // height
        'center', // gravity
        80 // quality
      );

      // Convert URL object to string
      const urlString = previewUrl.href || previewUrl.toString();

      return urlString;
    } catch (error) {
      // Fallback to getFileView (direct file access)
      try {
        const viewUrl = this.bucket.getFileView(conf.appwriteBucketId, fileId);
        const urlString = viewUrl.href || viewUrl.toString();
        return urlString;
      } catch (viewError) {
        console.error("❌ Failed to generate image URL for fileId:", fileId);
        return null;
      }
    }
  }

  // Alternative method to get direct file view URL
  getFileView(fileId) {
    if (!fileId) {
      return null;
    }

    try {
      const viewUrl = this.bucket.getFileView(conf.appwriteBucketId, fileId);
      return viewUrl.href || viewUrl.toString();
    } catch (error) {
      console.error("❌ Failed to generate file view URL for fileId:", fileId);
      return null;
    }
  }
}

const service = new Service();

// Add global test functions for debugging
if (typeof window !== 'undefined') {
  // Test CORS configuration
  window.testCORS = () => {
    console.log("🌐 CORS Configuration Check:");
    console.log("📋 Current frontend URL:", window.location.origin);
    console.log("🔧 Add this URL to Appwrite Console → Settings → CORS:");
    console.log("   ", window.location.origin);
    console.log("📝 Also add these common development URLs:");
    console.log("   http://localhost:5173");
    console.log("   http://localhost:3000");
    console.log("   http://127.0.0.1:5173");
    console.log("🚨 If images fail to load, this is likely a CORS issue!");
  };

  window.testAppwriteConnection = async () => {
    console.log("🧪 Testing Appwrite Connection...");
    console.log("📋 Configuration:", {
      url: conf.appwriteUrl,
      projectId: conf.appwriteProjectId,
      databaseId: conf.appwriteDatabaseId,
      collectionId: conf.appwriteCollectionId,
      bucketId: conf.appwriteBucketId
    });

    try {
      // Test database connection
      console.log("🔄 Testing database connection...");
      const posts = await service.getPosts();
      console.log("✅ Database connection successful. Posts found:", posts?.documents?.length || 0);

      // Test each post's image
      if (posts?.documents?.length > 0) {
        console.log("🖼️ Testing image URLs...");
        posts.documents.slice(0, 3).forEach((post, index) => {
          console.log(`📝 Post ${index + 1}:`, {
            id: post.$id,
            title: post.title,
            featuredImage: post.featuredImage,
            hasImage: !!post.featuredImage
          });

          if (post.featuredImage) {
            const imageUrl = service.getFilePreview(post.featuredImage);
            console.log(`🔗 Image URL for "${post.title}":`, imageUrl);

            // Test if URL is accessible
            if (imageUrl) {
              console.log(`🌐 Test this URL manually: ${imageUrl}`);
            }
          }
        });
      }

      // Test storage access
      console.log("🪣 Testing storage access...");
      const testUrl = service.getFilePreview('test-file-id');
      console.log("🔗 Test URL generation (should fail gracefully):", testUrl);

      console.log("✅ Appwrite connection test completed!");
      return true;
    } catch (error) {
      console.error("❌ Appwrite connection test failed:", error);
      return false;
    }
  };

  // Test specific image URL
  window.testImageURL = (fileId) => {
    if (!fileId) {
      console.log("❌ Please provide a file ID: window.testImageURL('your-file-id')");
      return;
    }

    console.log("🖼️ Testing image URL for file ID:", fileId);

    const previewUrl = service.getFilePreview(fileId);
    const viewUrl = service.getFileView(fileId);

    console.log("📋 Generated URLs:");
    console.log("   Preview URL:", previewUrl);
    console.log("   View URL:", viewUrl);
    console.log("🌐 Test these URLs manually:");
    console.log("   Preview:", previewUrl);
    console.log("   View:", viewUrl);

    // Try to load the image programmatically
    if (previewUrl) {
      const img = new Image();
      img.onload = () => console.log("✅ Preview URL loads successfully!");
      img.onerror = () => console.error("❌ Preview URL failed to load - check permissions/CORS");
      img.src = previewUrl;
    }
  };
}

export default service;
