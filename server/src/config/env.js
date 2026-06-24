import 'dotenv/config';

const ALLOWED_ENVIRONMENTS = ['development', 'production', 'test'];

function readRawConfig() {
  const nodeEnv = process.env.NODE_ENV ?? 'development';

  return {
    port: process.env.PORT ?? (nodeEnv === 'development' ? '5000' : undefined),
    nodeEnv,
    clientUrl:
      process.env.CLIENT_URL ??
      (nodeEnv === 'development' ? 'http://localhost:5173' : undefined),
    mongodbUri: process.env.MONGODB_URI,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  };
}

function validateConfig(rawConfig) {
  const errors = [];

  if (!rawConfig.port) {
    errors.push('PORT is required.');
  }

  const parsedPort = Number.parseInt(rawConfig.port, 10);

  if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
    errors.push('PORT must be a valid TCP port between 1 and 65535.');
  }

  if (!rawConfig.nodeEnv) {
    errors.push('NODE_ENV is required.');
  } else if (!ALLOWED_ENVIRONMENTS.includes(rawConfig.nodeEnv)) {
    errors.push(
      `NODE_ENV must be one of: ${ALLOWED_ENVIRONMENTS.join(', ')}.`,
    );
  }

  if (!rawConfig.clientUrl) {
    errors.push('CLIENT_URL is required.');
  } else {
    try {
      new URL(rawConfig.clientUrl);
    } catch {
      errors.push('CLIENT_URL must be a valid URL.');
    }
  }

  if (!rawConfig.mongodbUri) {
    errors.push('MONGODB_URI is required.');
  } else if (!isSupportedMongoUri(rawConfig.mongodbUri)) {
    errors.push('MONGODB_URI must start with mongodb:// or mongodb+srv://.');
  }

  if (!rawConfig.jwtAccessSecret) {
    errors.push('JWT_ACCESS_SECRET is required.');
  }

  if (!rawConfig.jwtRefreshSecret) {
    errors.push('JWT_REFRESH_SECRET is required.');
  }

  if (
    rawConfig.jwtAccessSecret &&
    rawConfig.jwtRefreshSecret &&
    rawConfig.jwtAccessSecret === rawConfig.jwtRefreshSecret
  ) {
    errors.push('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different.');
  }

  if (errors.length > 0) {
    throw new Error(
      ['Invalid server environment configuration:', ...errors].join('\n- '),
    );
  }

  return {
    port: parsedPort,
    nodeEnv: rawConfig.nodeEnv,
    clientUrl: rawConfig.clientUrl,
    mongodbUri: rawConfig.mongodbUri,
    jwtAccessSecret: rawConfig.jwtAccessSecret,
    jwtRefreshSecret: rawConfig.jwtRefreshSecret,
    isProduction: rawConfig.nodeEnv === 'production',
    isDevelopment: rawConfig.nodeEnv === 'development',
  };
}

export const config = validateConfig(readRawConfig());

function isSupportedMongoUri(value) {
  return value.startsWith('mongodb://') || value.startsWith('mongodb+srv://');
}
