import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ClientNaverProviderGuard extends AuthGuard('naver-provider') {}
