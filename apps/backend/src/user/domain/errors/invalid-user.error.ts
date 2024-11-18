import { BaseError, ErrorCodes } from '../../../shared';

export class InvalidUserError extends BaseError {
  constructor(message: string) {
    super(message, ErrorCodes.DOMAIN_USER_INVALID_ERROR);
  }
}
