import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClientAppleProviderGuard extends AuthGuard('apple-provider') {}
