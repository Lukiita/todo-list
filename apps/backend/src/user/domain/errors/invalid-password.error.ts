import { BaseError, ErrorCodes } from '../../../shared';

export class InvalidPasswordError extends BaseError {
  constructor(message: string) {
    super(message, ErrorCodes.DOMAIN_PASSWORD_INVALID_ERROR);
  }
}
