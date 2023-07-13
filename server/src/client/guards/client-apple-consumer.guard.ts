import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClientAppleConsumerGuard extends AuthGuard('apple-consumer') {}
