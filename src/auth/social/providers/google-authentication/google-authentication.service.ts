import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDTO } from '../../dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.services';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /** Inject jwtConfiguration */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /** injecting the usersService */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    /** inject the generate tokens provider */
    private readonly generateTokensProvider: GenerateTokensProvider
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleAuthId;
    const clientSecret = this.jwtConfiguration.googleAuthSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }
  public async authenticate(googleTokenDTO: GoogleTokenDTO) {
    try {
      //verify the google token sent by user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDTO.token
      });

      // extract the payload from Google JWT
      const {
        email,
        sub: googleId,
        family_name: lastName,
        given_name: firstName
      } = loginTicket.getPayload();
      // Find the user in the databse using the googleId
      const user = await this.usersService.findOneByUserGoogleId(googleId);
      if (user) {
        return await this.generateTokensProvider.generateTokens(user);
      }

      // If not create a new user and then generate tokens
      const newUser = await this.usersService.createUser({
        firstName,
        lastName,
        email,
        password: '',
        googleId
      });

      if (newUser)
        return await this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
