import { Client, Databases, Storage, Account } from "appwrite";
import conf from "../conf/conf.js";

/**
 * Test Appwrite connection and configuration
 * This utility helps verify that Appwrite is properly configured
 */
export class AppwriteConnectionTest {
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.account = new Account(this.client);
  }

  /**
   * Test basic connection to Appwrite
   */
  async testConnection() {
    try {
      // Try to get account info (this will work even if not logged in)
      await this.account.get();
      return { success: true, message: "Connected to Appwrite successfully" };
    } catch (error) {
      if (error.code === 401) {
        // 401 means we're connected but not authenticated, which is fine
        return { success: true, message: "Connected to Appwrite successfully (not authenticated)" };
      }
      return { success: false, message: `Connection failed: ${error.message}` };
    }
  }

  /**
   * Test database access
   */
  async testDatabase() {
    try {
      await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        []
      );
      return { success: true, message: "Database and collection accessible" };
    } catch (error) {
      return { success: false, message: `Database test failed: ${error.message}` };
    }
  }

  /**
   * Test storage bucket access
   */
  async testStorage() {
    try {
      await this.storage.listFiles(conf.appwriteBucketId);
      return { success: true, message: "Storage bucket accessible" };
    } catch (error) {
      return { success: false, message: `Storage test failed: ${error.message}` };
    }
  }

  /**
   * Run all tests
   */
  async runAllTests() {
    console.log("🧪 Testing Appwrite Configuration...\n");
    
    const tests = [
      { name: "Connection", test: () => this.testConnection() },
      { name: "Database", test: () => this.testDatabase() },
      { name: "Storage", test: () => this.testStorage() }
    ];

    const results = [];
    
    for (const { name, test } of tests) {
      console.log(`Testing ${name}...`);
      try {
        const result = await test();
        results.push({ name, ...result });
        console.log(result.success ? `✅ ${result.message}` : `❌ ${result.message}`);
      } catch (error) {
        results.push({ name, success: false, message: error.message });
        console.log(`❌ ${name} test failed: ${error.message}`);
      }
      console.log("");
    }

    const allPassed = results.every(r => r.success);
    console.log(allPassed ? "🎉 All tests passed!" : "⚠️  Some tests failed. Check your Appwrite configuration.");
    
    return { allPassed, results };
  }

  /**
   * Print configuration status
   */
  printConfig() {
    console.log("📋 Current Appwrite Configuration:");
    console.log(`URL: ${conf.appwriteUrl}`);
    console.log(`Project ID: ${conf.appwriteProjectId}`);
    console.log(`Database ID: ${conf.appwriteDatabaseId}`);
    console.log(`Collection ID: ${conf.appwriteCollectionId}`);
    console.log(`Bucket ID: ${conf.appwriteBucketId}`);
    console.log(`TinyMCE API: ${conf.tinymceAPI ? 'Configured' : 'Not configured'}`);
    console.log("");
  }
}

// Export a singleton instance for easy use
export const appwriteTest = new AppwriteConnectionTest();

// Helper function to run tests from browser console
export const testAppwriteConnection = async () => {
  const tester = new AppwriteConnectionTest();
  tester.printConfig();
  return await tester.runAllTests();
};
