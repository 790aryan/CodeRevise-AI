import mongoose from 'mongoose';
import { config } from './env.js';

const DATABASE_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

let databaseEventsRegistered = false;

export async function connectDatabase() {
  registerDatabaseEvents();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connection established.');
  } catch (error) {
    console.error('MongoDB connection failed.');
    console.error(error.message);
    throw error;
  }
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.connection.close();
}

export function getDatabaseStatus() {
  return DATABASE_STATES[mongoose.connection.readyState] ?? 'unknown';
}

function registerDatabaseEvents() {
  if (databaseEventsRegistered) {
    return;
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB event: connected.');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB event: disconnected.');
  });

  mongoose.connection.on('error', (error) => {
    console.error(`MongoDB event: error - ${error.message}`);
  });

  databaseEventsRegistered = true;
}
