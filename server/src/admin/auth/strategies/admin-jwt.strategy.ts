import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt.payload.interface';

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ADMIN_JWT_SECRET'),
    };
    super(opts);
  }

  async validate(payload: JwtPayload) {
    const staff = await this.authService.getOneFromUserId(payload.email);
    if (!staff) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
    return staff;
  }
}
