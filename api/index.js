// Vercel serverless function wrapper for Express app
import app from '../backend/src/server.js';
import connectDB from '../backend/src/config/db.js';

// Connect to database on cold start
let isConnected = false;
let isConnecting = false;

const connectOnce = async () => {
  if (isConnected) return;
  
  if (isConnecting) {
    // Wait for existing connection attempt
    while (isConnecting && !isConnected) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    return;
  }
  
  isConnecting = true;
  try {
    await connectDB();
    isConnected = true;
    console.log('Database connected (serverless function)');
  } catch (error) {
    console.error('Database connection error:', error.message);
    isConnecting = false;
    // Don't throw - let the request continue, routes will handle DB errors
  } finally {
    isConnecting = false;
  }
};

export default async (req, res) => {
  try {
    // Connect to database if not already connected (non-blocking)
    await connectOnce();
    
    // Handle the request with Express app
    // Express handles the response asynchronously
    app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message 
      });
    }
  }
};

