import * as crypto from 'crypto';
import { ValueObject } from '../../shared';
import { InvalidPasswordError } from './errors';

const SALT_LENGTH = 16;
const HASH_ITERATIONS = 10000;
const KEY_LENGTH = 64;
const DIGEST = 'sha256';
export class Password extends ValueObject {
  public readonly value: string;

  constructor(plainPassword: string) {
    super();
    this.validatePassword(plainPassword);
    this.value = this.hashPassword(plainPassword);
  }

  private static hashWithSalt(plainPassword: string, salt: string): string {
    return crypto
      .pbkdf2Sync(plainPassword, salt, HASH_ITERATIONS, KEY_LENGTH, DIGEST)
      .toString('hex');
  }

  private validatePassword(plainPassword: string): void {
    if (!plainPassword) {
      throw new InvalidPasswordError('Password is required');
    }

    if (plainPassword.length < 8) {
      throw new InvalidPasswordError('Password must have at least 8 characters');
    }

    if (plainPassword.length > 16) {
      throw new InvalidPasswordError('Password must have at most 16 characters');
    }

    if (typeof plainPassword !== 'string') {
      throw new InvalidPasswordError('Password must be a string');
    }
  }

  private hashPassword(plainPassword: string): string {
    const salt = crypto.randomBytes(SALT_LENGTH).toString('hex');
    const hash = Password.hashWithSalt(plainPassword, salt);
    return `${salt}:${hash}`;
  }

  public matches(plainPassword: string): boolean {
    const [salt, storedHash] = this.value.split(':');
    const hash = Password.hashWithSalt(plainPassword, salt);
    return storedHash === hash;
  }
}
