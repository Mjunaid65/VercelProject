import mongoose from 'mongoose';

// Cache connection state
let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  
  // If connection is in progress, wait for it
  if (connectionPromise) {
    return connectionPromise;
  }
  
  // Get connection string from environment or use default
  let uri = process.env.MONGO_URI || "mongodb+srv://mjunaidahmed3_db_user:Mjunaid65@junaid.arhutfr.mongodb.net/librarydb?appName=junaid";
  
  // Fix connection string format if database name is in wrong place
  // If it's like: mongodb+srv://.../?appName=junaid/librarydb
  // Convert to: mongodb+srv://.../librarydb?appName=junaid
  if (uri.includes('/?appName=') && uri.includes('/librarydb')) {
    uri = uri.replace('/?appName=junaid/librarydb', '/librarydb?appName=junaid');
  }
  
  // If MONGO_URI doesn't have a database name before query params, add it
  // Check if there's a database name between the last / and the first ?
  if (uri && !uri.match(/\/[^\/\?]+(\?|$)/)) {
    // No database name found, add it
    if (uri.includes('?')) {
      uri = uri.replace(/\/(\?)/, '/librarydb$1');
    } else {
      uri = uri.replace(/\/$/, '') + '/librarydb';
    }
  }
  
  // Create connection promise
  connectionPromise = (async () => {
    try {
      // If already connecting or connected, don't reconnect
      if (mongoose.connection.readyState === 1) {
        isConnected = true;
        return;
      }
      
      // Close existing connection if any
      if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
      }
      
      await mongoose.connect(uri);
      isConnected = true;
      console.log('MongoDB connected to database:', mongoose.connection.db.databaseName);
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      isConnected = false;
      connectionPromise = null; // Reset so we can retry
      throw error;
    }
  })();
  
  return connectionPromise;
};

export default connectDB;

