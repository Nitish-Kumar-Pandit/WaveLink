import React, { useState } from 'react';
import { Client, Account } from 'appwrite';
import conf from '../conf/conf.js';

const AppwritePingTest = () => {
  const [pingResult, setPingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendPing = async () => {
    setIsLoading(true);
    setPingResult(null);

    try {
      // Create Appwrite client
      const client = new Client()
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

      const account = new Account(client);

      // Try to get account info (this will work even if not logged in)
      // A 401 error means we're connected but not authenticated, which is fine for ping test
      try {
        await account.get();
        setPingResult({
          success: true,
          message: 'Ping successful! Appwrite connection is working.',
          details: 'Connected and authenticated'
        });
      } catch (error) {
        if (error.code === 401) {
          // 401 means we're connected but not authenticated, which is fine
          setPingResult({
            success: true,
            message: 'Ping successful! Appwrite connection is working.',
            details: 'Connected but not authenticated (this is normal)'
          });
        } else {
          throw error;
        }
      }
    } catch (error) {
      setPingResult({
        success: false,
        message: 'Ping failed! Check your Appwrite configuration.',
        details: error.message,
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Appwrite Connection Test
      </h3>
      
      <button
        onClick={sendPing}
        disabled={isLoading}
        className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isLoading ? 'Sending ping...' : 'Send a ping'}
      </button>

      {pingResult && (
        <div className={`mt-4 p-4 rounded-md ${
          pingResult.success 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex items-center">
            <span className="text-lg mr-2">
              {pingResult.success ? '✅' : '❌'}
            </span>
            <div>
              <p className="font-medium">{pingResult.message}</p>
              <p className="text-sm mt-1">{pingResult.details}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p><strong>Project ID:</strong> {conf.appwriteProjectId}</p>
        <p><strong>Endpoint:</strong> {conf.appwriteUrl}</p>
      </div>
    </div>
  );
};

export default AppwritePingTest;
