import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { SocialCallbackData } from '../interfaces/social-callback-data.interface';

@Injectable()
export class NaverProviderStrategy extends PassportStrategy(
  Strategy,
  'naver-provider',
) {
  constructor(configService: ConfigService) {
    super({
      callbackURL:
        'https://www.aiplaza.co.kr/apis/c/auth/sign-in/provider/naver/callback',
      clientID: configService.getOrThrow('NAVER_LOGIN_CLIENT_ID'),
      clientSecret: configService.getOrThrow('NAVER_LOGIN_CLIENT_SECRET'),
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const user_email = profile._json.email;
    try {
      done(null, {
        id: `${profile.id}`,
        email: `${user_email}`,
        type: 'naver',
      });
    } catch (error) {
      done(error);
    }
  }
}
