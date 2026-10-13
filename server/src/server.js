import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { initEmailTransporter } from './services/emailService.js';
import { autoSeedIfEmpty } from './utils/autoSeed.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await autoSeedIfEmpty();
    initEmailTransporter();

    app.listen(PORT, () => {
      console.log(`🚀 [Server] Abdur Rahman Khan Portfolio API is running on http://localhost:${PORT}`);
      console.log(`🌐 [Server] Health check available at: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ [Server] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

