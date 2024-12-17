import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDTO } from '../../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /** Inject jwtConfiguration */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleAuthId;
    const clientSecret = this.jwtConfiguration.googleAuthSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }
  public async authentication(googleTokenDTO: GoogleTokenDTO) {
    //verify the google token sent by user
    // extract the payload from Google JWT
    // Find the user in the databse using the googleId
    // If not create a new user and then generate tokens
    // Throw unauthorized exception
  }
}
