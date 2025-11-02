/**
 * Login contract
 */
export interface ILoginRequest {
  email: string;
  password: string;
}

/**
 * Login response contract
 */
export interface ILoginResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    username?: string;
  };
}

/**
 * Register contract
 */
export interface IRegisterRequest {
  email: string;
  username?: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

/**
 * Refresh token contract
 */
export interface IRefreshTokenRequest {
  refreshToken: string;
}

/**
 * JWT payload contract
 */
export interface IJwtPayload {
  sub: string; // user id
  email: string;
  username?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

