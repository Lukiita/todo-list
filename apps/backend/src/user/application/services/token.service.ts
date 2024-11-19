import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
export class TokenService {

  public generateToken(payload: { userId: string; email: string }): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  }

  public verifyToken(token: string): { userId: string; email: string } | null {
    try {
      return jwt.verify(token, SECRET_KEY) as { userId: string; email: string };
    } catch (error) {
      return null;
    }
  }
}
