import mongoose from 'mongoose';

const connectDB = async () => {
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
  
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected to database:', mongoose.connection.db.databaseName);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

export default connectDB;

