import { AuthGuard } from '@nestjs/passport';

export class ClientCredentialProviderGuard extends AuthGuard(
  'client-provider-local',
) {}
