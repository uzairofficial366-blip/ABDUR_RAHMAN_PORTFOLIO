import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let memServer = null;

export const connectDB = async (customUri = null) => {
  const uri = customUri || process.env.MONGODB_URI;

  // Attempt connection to provided URI
  if (uri) {
    try {
      console.log(`[Database] Attempting connection to: ${uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')}`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 2500, // Quick fallback if local MongoDB service isn't running
      });
      console.log('✅ [Database] Connected successfully to MongoDB instance.');
      return mongoose.connection;
    } catch (err) {
      console.warn(`⚠️ [Database] Could not connect to primary MongoDB URI (${err.message}).`);
    }
  }

  // If local/URI connection failed or not provided, launch in-memory MongoDB for zero-config dev/test
  try {
    console.log('ℹ️ [Database] Initializing embedded in-memory MongoDB for local execution...');
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memServer = await MongoMemoryServer.create();
    const memUri = memServer.getUri();
    await mongoose.connect(memUri);
    console.log('✅ [Database] Connected to in-memory MongoDB. (Data resets on server restart)');
    return mongoose.connection;
  } catch (memErr) {
    console.error('❌ [Database] Failed to initialize in-memory database:', memErr.message);
    throw memErr;
  }
};

export const disconnectDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (memServer) {
      await memServer.stop();
      memServer = null;
    }
  } catch (err) {
    console.error('Error disconnecting database:', err);
  }
};

