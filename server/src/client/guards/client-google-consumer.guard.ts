import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClientGoogleConsumerGuard extends AuthGuard('google-consumer') {}
