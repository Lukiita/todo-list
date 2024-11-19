import { UserRepository } from '../../../domain';
import { InvalidCredentialsError } from '../../../domain/errors';
import { TokenService } from '../../services';

export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) { }

  public async execute(input: GetByEmailInput): Promise<GetByEmalOutput> {
    const user = await this.userRepository.getByEmail(input.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatch = user.matchesPassword(input.password);
    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const token = this.tokenService.generateToken({ userId: user.id, email: user.email });
    return {
      token,
    };
  }
}

type GetByEmailInput = {
  email: string;
  password: string;
};

type GetByEmalOutput = {
  token: string;
};
