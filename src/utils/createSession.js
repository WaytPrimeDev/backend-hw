import { randomBytes } from 'crypto';
import {
  ACCESS_TOKEN_VALID_UNTIL,
  REFRESH_TOKEN_VALID_UNTIL,
} from '../constants/index.js';

export const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_VALID_UNTIL);
  const refreshTokenValidUntil = new Date(
    Date.now() + REFRESH_TOKEN_VALID_UNTIL,
  );
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};
