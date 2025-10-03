import 'dotenv/config';

export const env = (name, defaultValue) => {
  if (!name) throw new Error(`env: variable name is required`);
  const value = process.env[name];
  if (value !== undefined) return value;

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error('missin env name');
};
