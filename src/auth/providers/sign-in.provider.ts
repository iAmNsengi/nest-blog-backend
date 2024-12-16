import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { SignInDTO } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.services';
import { HashingProvider } from './hashing.provider';
import requestTimeoutError from 'src/errors/RequestTimeout';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**injecting the userService */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    /** inject the hashing provider */
    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider
  ) {}
  public async signin(signInDTO: SignInDTO) {
    // find user using email
    let user = await this.userService.findOneByEmail(signInDTO.email);
    // throw an exception when user not found
    if (!user)
      throw new UnauthorizedException(
        'User with given credentials was not found'
      );

    // compare password to the hash
    let isEqual = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDTO.password,
        user.password
      );
    } catch (error) {
      requestTimeoutError("Couldn't compare passwords");
    }
    if (!isEqual)
      throw new UnauthorizedException(
        '"User with given credentials was not found'
      );

    return await this.generateTokensProvider.generateTokens(user);
  }
}
