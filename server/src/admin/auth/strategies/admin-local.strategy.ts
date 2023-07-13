import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(private readonly authService: AuthService) {
    const opts: IStrategyOptions = {
      session: false,
    };
    super(opts);
  }

  validate(username: string, password: string): Promise<any> {
    return this.authService.credentialValidate(username, password);
  }
}
