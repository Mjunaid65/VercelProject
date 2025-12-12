// Vercel serverless function wrapper for Express app
import app from '../backend/src/server.js';
import connectDB from '../backend/src/config/db.js';

// Connect to database on cold start
let isConnected = false;

const connectOnce = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log('Database connected (serverless function)');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }
};

export default async (req, res) => {
  try {
    // Connect to database if not already connected
    await connectOnce();
    
    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};

