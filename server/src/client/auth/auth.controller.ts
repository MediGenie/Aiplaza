import {
  BadRequestException,
  Body,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { memoryStorage } from 'multer';
import {
  AccountDocument,
  AccountStatus,
  AccountType,
} from 'src/database/schema/account.schema';
import { ClientController } from 'src/decorators/client-controller.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { GetCookie } from 'src/decorators/get-cookie.decorator';
import { ClientAppleConsumerGuard } from '../guards/client-apple-consumer.guard';
import { ClientAppleProviderGuard } from '../guards/client-apple-provider.guard';
import { ClientGoogleConsumerGuard } from '../guards/client-google-consumer.guard';
import { ClientGoogleProviderGuard } from '../guards/client-google-provider.guard';
import { ClientJwtGuard } from '../guards/client-jwt.guard';
import { ClientNaverConsumerGuard } from '../guards/client-naver-consumer.guard';
import { ClientNaverProviderGuard } from '../guards/client-naver-provider.guard';
import { ClientCredentialConsumerGuard } from '../guards/client.credential.consumer.guard';
import { ClientCredentialProviderGuard } from '../guards/client.credential.provider.guard';
import {
  EmailDto,
  SignInAccountBodyDto,
  SignInAccountTypeDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { CreateFromEmailDto } from './dto/create-from-email.dto';
import { CreateFromSocialDto } from './dto/create-from-social.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { SocialCallbackData } from './interfaces/social-callback-data.interface';
import { socialAppleCallbackTemplete } from './templates/social-apple-callback.templates';
import { socialCallbackTemplete } from './templates/social-callback.templates';
import { socialNaverCallbackTemplete } from './templates/social-naver-callback.templates';

type HTML = string;
@ClientController('auth')
export class AuthController {
  static refresh_token_name = 'x-client-login-token';
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  private exportLoginInfo(account: AccountDocument) {
    return {
      _id: account._id.toString(),
      email: account.email,
      type: account.type,
      name: account.name,
      tel: account.tel,
    };
  }

  private async handleLogin(
    account: AccountDocument,
    res: Response,
    isPersist: boolean,
  ) {
    const id = account._id.toString();
    const email = account.email;
    const type = account.type;
    const payload: JwtPayload = {
      id,
      email,
      type,
    };
    const access_token = await this.authService.issueAccessToken(payload);
    const refresh_token = await this.authService.issueRefreshToken(payload);

    const decodedValue = this.jwtService.decode(refresh_token) as JwtPayload & {
      exp: number;
    };

    const expires = new Date(decodedValue.exp * 1000);
    res.cookie(AuthController.refresh_token_name, refresh_token, {
      expires: isPersist ? expires : undefined,
      sameSite: true,
      httpOnly: true,
    });
    res.json({
      ...this.exportLoginInfo(account),
      access_token,
    });
    res.end();
  }

  @Post('sign-in/provider')
  @UseGuards(ClientCredentialProviderGuard)
  async loginProvider(
    @CurrentUser() account: AccountDocument,
    @Res() res: Response,
    @Body('isPersist') isPersist: boolean,
  ) {
    return this.handleLogin(account, res, isPersist);
  }

  @Post('sign-in/consumer')
  @UseGuards(ClientCredentialConsumerGuard)
  loginConsumer(
    @CurrentUser() account: AccountDocument,
    @Res() res: Response,
    @Body('isPersist') isPersist: boolean,
  ) {
    return this.handleLogin(account, res, isPersist);
  }

  @Get('sign-in/provider/google')
  @UseGuards(ClientGoogleProviderGuard)
  async goolgeSignInProvider() {
    return;
  }

  @Get('sign-in/provider/google/callback')
  @UseGuards(ClientGoogleProviderGuard)
  async callbackGoogleProvider(
    @CurrentUser() user: SocialCallbackData,
  ): Promise<HTML> {
    let result = socialCallbackTemplete;
    result = result.replace('{{id}}', user.id);
    result = result.replace('{{type}}', user.type);
    result = result.replace('{{account_type}}', 'provider');
    result = result.replace('{{email}}', user.email);
    return result;
  }
  @Get('sign-in/consumer/google')
  @UseGuards(ClientGoogleConsumerGuard)
  async goolgeConsumerSignIn() {
    return;
  }

  @Get('sign-in/consumer/google/callback')
  @UseGuards(ClientGoogleConsumerGuard)
  async callbackGoogleConsumer(
    @CurrentUser() user: SocialCallbackData,
  ): Promise<HTML> {
    let result = socialCallbackTemplete;
    result = result.replace('{{id}}', user.id);
    result = result.replace('{{type}}', user.type);
    result = result.replace('{{account_type}}', 'consumer');
    result = result.replace('{{email}}', user.email);
    return result;
  }

  @Get('sign-in/provider/naver')
  @UseGuards(ClientNaverProviderGuard)
  async naverSignInProvider() {
    return;
  }

  @Get('sign-in/provider/naver/callback')
  @UseGuards(ClientNaverProviderGuard)
  async callbackNaverProvider(
    @CurrentUser() user: SocialCallbackData,
  ): Promise<HTML> {
    let result = socialNaverCallbackTemplete;
    result = result.replace('{{id}}', user.id);
    result = result.replace('{{type}}', user.type);
    result = result.replace('{{account_type}}', 'provider');
    result = result.replace('{{email}}', user.email);
    return result;
  }
  @Get('sign-in/consumer/naver')
  @UseGuards(ClientNaverConsumerGuard)
  async naverConsumerSignIn() {
    return;
  }

  @Get('sign-in/consumer/naver/callback')
  @UseGuards(ClientNaverConsumerGuard)
  async callbackNaverConsumer(
    @CurrentUser() user: SocialCallbackData,
  ): Promise<HTML> {
    let result = socialNaverCallbackTemplete;
    result = result.replace('{{id}}', user.id);
    result = result.replace('{{type}}', user.type);
    result = result.replace('{{account_type}}', 'consumer');
    result = result.replace('{{email}}', user.email);
    return result;
  }

  @Get('sign-in/provider/apple')
  @UseGuards(ClientAppleProviderGuard)
  async appleSignInProvider() {
    return;
  }

  @Post('sign-in/provider/apple/callback')
  @UseGuards(ClientAppleProviderGuard)
  async callbackAppleProvider(
    @CurrentUser() user: SocialCallbackData,
  ): Promise<HTML> {
    let result = socialAppleCallbackTemplete;
    result = result.replace('{{id}}', user.id);
    result = result.replace('{{type}}', user.type);
    result = result.replace('{{account_type}}', 'provider');
    result = result.replace('{{email}}', user.email);
    return result;
  }

  @Get('sign-in/consumer/apple')
  @UseGuards(ClientAppleConsumerGuard)
  async appleConsumerSignIn() {
    return;
  }

  @Post('sign-in/consumer/apple/callback')
  @UseGuards(ClientAppleConsumerGuard)
  async callbackAppleConsumer(
    @CurrentUser() user: SocialCallbackData,
  ): Promise<HTML> {
    let result = socialAppleCallbackTemplete;
    result = result.replace('{{id}}', user.id);
    result = result.replace('{{type}}', user.type);
    result = result.replace('{{account_type}}', 'consumer');
    result = result.replace('{{email}}', user.email);
    return result;
  }

  @Post('sign-up')
  @UseInterceptors(
    FileInterceptor('biz_cert', {
      storage: memoryStorage(),
    }),
  )
  signUpCredential(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFromEmailDto,
  ) {
    return this.authService.signUpFromEmail(body, file);
  }

  @Post('social-sign-up')
  @UseInterceptors(
    FileInterceptor('biz_cert', {
      storage: memoryStorage(),
    }),
  )
  socialSignUpCredential(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateFromSocialDto,
  ) {
    return this.authService.signUpFromSocial(body, file);
  }

  @Post('access-token')
  async getAccessToken(
    @GetCookie(AuthController.refresh_token_name) refresh_token?: string,
  ) {
    if (!refresh_token) {
      throw new UnauthorizedException();
    }
    try {
      const user = await this.authService.getUserFromRefreshToken(
        refresh_token,
      );
      const payload: JwtPayload = {
        id: user._id.toString(),
        email: user.email,
        type: user.type,
      };
      const access_token = await this.authService.issueAccessToken(payload);
      return { access_token };
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Get('me')
  @UseGuards(ClientJwtGuard)
  async getMe(@CurrentUser() user: AccountDocument) {
    return this.exportLoginInfo(user);
  }
  @Post('sign-out')
  @UseGuards(ClientJwtGuard)
  async logout(@CurrentUser() user: AccountDocument, @Res() res: Response) {
    await this.authService.clearRefreshToken(user._id.toString());
    res.clearCookie(AuthController.refresh_token_name);
    return res.end();
  }

  @Post('withdrawl')
  @UseGuards(ClientJwtGuard)
  async withdrawl(@CurrentUser() user: AccountDocument, @Res() res: Response) {
    await this.authService.withdrawl(user._id.toString());
    res.clearCookie(AuthController.refresh_token_name);
    return res.end();
  }

  @Post('sign-in/:type/social')
  async handleSocialLogin(
    @Param() param: SignInAccountTypeDto,
    @Body() body: SignInAccountBodyDto,
    @Res() res: Response,
  ) {
    const account = await this.authService.socialLogin(
      param.type,
      body.id,
      body.type,
    );

    if (!account || account === null) {
      throw new UnauthorizedException({
        type: 'redirect',
        message: '가입되지 않은 사용자입니다.',
      });
    }

    if (account.deleted_at !== null && account.status === AccountStatus.LEAVE) {
      throw new UnauthorizedException('탈퇴한 사용자입니다.');
    }

    if (account.deleted_at !== null) {
      throw new UnauthorizedException('정지된 사용자입니다.');
    }
    await this.handleLogin(account, res, body.isPersist);
  }

  @Patch('reset-pw/:type')
  resetPassword(@Param() param: SignInAccountTypeDto, @Body() body: EmailDto) {
    let type: AccountType;
    if (param.type === 'consumer') {
      type = AccountType.CONSUMER;
    } else if (param.type === 'provider') {
      type = AccountType.PROVIDER;
    } else {
      throw new BadRequestException('알 수 없는 요청입니다.');
    }
    return this.authService.resetPassword(body.email, type);
  }
}
