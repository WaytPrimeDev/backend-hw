import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const sessionSettings = () => {
  const accesToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accesTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);
  return {
    accesToken,
    refreshToken,
    accesTokenValidUntil,
    refreshTokenValidUntil,
  };
};
