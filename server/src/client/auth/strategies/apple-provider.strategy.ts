import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { join } from 'path';
import { Strategy } from '@arendajaelu/nestjs-passport-apple';

@Injectable()
export class AppleProviderStrategy extends PassportStrategy(
  Strategy,
  'apple-provider',
) {
  constructor(configService: ConfigService) {
    const p8_path = join(__dirname, '../../../../cert/AuthKey_79G8575BS2.p8');
    const APPLE_SERVICE_ID = configService.getOrThrow('APPLE_LOGIN_CLIENT_ID');
    const APPLE_TEAM_ID = configService.getOrThrow('APPLE_LOGIN_TEAM_ID');
    const APPLE_KEY_ID = configService.getOrThrow('APPLE_LOGIN_KEY_ID');

    const opts = {
      clientID: APPLE_SERVICE_ID,
      teamID: APPLE_TEAM_ID,
      keyID: APPLE_KEY_ID,
      keyFilePath: p8_path,
      callbackURL:
        'https://www.aiplaza.co.kr/apis/c/auth/sign-in/provider/apple/callback',
      passReqToCallback: false,
      scope: ['email', 'name'],
    };

    super(opts);
  }

  validate(accessToken, refreshToken, profile, done) {
    try {
      done(null, {
        id: `${profile.id}`,
        type: 'apple',
        email: `${profile.email}`,
      });
    } catch (error) {
      done(error);
    }
  }
}
