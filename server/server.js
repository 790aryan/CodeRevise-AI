import { app } from './src/app.js';
import { config } from './src/config/env.js';
import {
  connectDatabase,
  disconnectDatabase,
} from './src/config/database.js';

let server;

async function startServer() {
  try {
    await connectDatabase();

    server = app.listen(config.port, () => {
      console.log(`CodeRevise AI server listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('Server startup failed.');
    console.error(error.message);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Shutting down CodeRevise AI API.`);

  try {
    await closeHttpServer();
    await disconnectDatabase();
    console.log('Shutdown completed.');
    process.exit(0);
  } catch (error) {
    console.error('Shutdown failed.');
    console.error(error.message);
    process.exit(1);
  }
}

function closeHttpServer() {
  return new Promise((resolve, reject) => {
    if (!server) {
      resolve();
      return;
    }

    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});

process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

void startServer();
