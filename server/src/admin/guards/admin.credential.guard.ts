import { AuthGuard } from '@nestjs/passport';

export class AdminCredentialGuard extends AuthGuard('admin-local') {}
