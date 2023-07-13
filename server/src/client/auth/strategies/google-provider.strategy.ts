import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, StrategyOptions } from 'passport-google-oauth20';
import { SocialCallbackData } from '../interfaces/social-callback-data.interface';

@Injectable()
export class GoogleProviderStrategy extends PassportStrategy(
  Strategy,
  'google-provider',
) {
  constructor(configService: ConfigService) {
    super({
      callbackURL:
        'https://www.aiplaza.co.kr/apis/c/auth/sign-in/provider/google/callback',
      clientID: configService.getOrThrow('GOOGLE_LOGIN_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_LOGIN_CLIENT_SECRET'),
      scope: ['email'],
    } as StrategyOptions);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: (error: any, user?: SocialCallbackData) => unknown,
  ) {
    try {
      done(null, {
        id: `${profile.id}`,
        type: 'google',
        email: `${profile.emails[0].value}`,
      });
    } catch (error) {
      done(error);
    }
  }
}
