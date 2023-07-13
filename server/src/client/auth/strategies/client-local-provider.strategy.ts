import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import { AccountType } from 'src/database/schema/account.schema';
import { AuthService } from '../auth.service';

@Injectable()
export class ClientLocalProviderStrategy extends PassportStrategy(
  Strategy,
  'client-provider-local',
) {
  constructor(private readonly authService: AuthService) {
    const opts: IStrategyOptions = {
      session: false,
    };
    super(opts);
  }

  validate(username: string, password: string): Promise<any> {
    return this.authService.credentialValidate(
      username,
      password,
      AccountType.PROVIDER,
    );
  }
}
