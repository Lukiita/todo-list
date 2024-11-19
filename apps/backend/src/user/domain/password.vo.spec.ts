import { InvalidPasswordError } from './errors';
import { Password } from './password.vo';

describe('Password Value Object', () => {
  it('should create a password object with a valid password', () => {
    const password = new Password('valid_password');
    expect(password).toBeInstanceOf(Password);
    expect(password.value).toMatch(/^[a-f0-9]{32}:[a-f0-9]{128}$/);  // Check if the value is a valid hex string in the format "salt:hash"
  });

  it('should create different hashes for different passwords', () => {
    const password1 = new Password('valid_password');
    const password2 = new Password('password_valid');
    expect(password1.value).not.toBe(password2.value);
  });

  it('should create different hashes for the same password due to salt', () => {
    const password1 = new Password('valid_password');
    const password2 = new Password('valid_password');
    expect(password1.value).not.toBe(password2.value);
  });

  test.each([
    null,
    undefined,
    'short',
    'A'.repeat(17),
    {},
    123,
    true,
    false,
    '',
    '     ',
  ])('should throw an error if the password is invalid: %s', (password: any) => {
    expect(() => new Password(password)).toThrowError(InvalidPasswordError);
  });

  describe('matches', () => {
    it('should return true if the password matches the original password', () => {
      const password = new Password('valid_password');
      expect(password.matches('valid_password')).toBe(true);
    });

    it('should return false if the password does not match the original password', () => {
      const password = new Password('valid_password');
      expect(password.matches('invalid_password')).toBe(false);
    });

    it('should return false if the password is case-sensitive', () => {
      const password = new Password('valid_password');
      expect(password.matches('Valid_password')).toBe(false);
    });

    it('should return false if the password is empty', () => {
      const password = new Password('valid_password');
      expect(password.matches('')).toBe(false);
    });
  });
});