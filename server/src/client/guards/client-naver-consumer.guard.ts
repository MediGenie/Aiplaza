import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClientNaverConsumerGuard extends AuthGuard('naver-consumer') {}
