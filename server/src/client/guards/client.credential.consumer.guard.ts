import { AuthGuard } from '@nestjs/passport';

export class ClientCredentialConsumerGuard extends AuthGuard(
  'client-consumer-local',
) {}
