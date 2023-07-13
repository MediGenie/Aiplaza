import {
  Body,
  Get,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { EmailDto } from 'src/client/auth/auth.dto';
import { StaffDocument } from 'src/database/schema/staff.schema';
import { AdminController } from 'src/decorators/admin-controller.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AdminCredentialGuard } from '../guards/admin.credential.guard';
import { AdminJwtGuard } from '../guards/admin.jwt.guard';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/jwt.payload.interface';

@AdminController('auth')
export class AuthController {
  refresh_token_name = 'x-adm-login-token';
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  private exportLoginInfo(staff: StaffDocument) {
    return {
      _id: staff._id.toString(),
      name: staff.name,
      email: staff.user_id,
    };
  }

  @Post('login')
  @UseGuards(AdminCredentialGuard)
  async login(@CurrentUser() staff: StaffDocument, @Res() res: Response) {
    const id = staff._id.toString();
    const email = staff.user_id;
    const payload: JwtPayload = {
      id: id,
      email: email,
    };
    const access_token = await this.authService.issueAccessToken(payload);
    const refresh_token = await this.authService.issueRefreshToken(payload);

    const decodedValue = this.jwtService.decode(refresh_token) as JwtPayload & {
      exp: number;
    };
    const expires = new Date(decodedValue.exp * 1000);
    console.log('expires: ', expires);
    res.cookie(this.refresh_token_name, refresh_token, {
      expires: expires,
      sameSite: true,
      httpOnly: true,
    });
    res.json({
      ...this.exportLoginInfo(staff),
      access_token,
    });
    res.end();
  }

  @Get('me')
  @UseGuards(AdminJwtGuard)
  async getMe(@CurrentUser() staff: StaffDocument) {
    return this.exportLoginInfo(staff);
  }

  @Get('access-token')
  async getAccessToken(@Req() req: Request, @Res() res: Response) {
    const refresh_token = req.cookies[this.refresh_token_name] || undefined;
    if (refresh_token === undefined) {
      throw new UnauthorizedException('리프레시 토큰이 존재하지 않습니다.');
    }
    try {
      const payload = this.jwtService.verify(refresh_token) as JwtPayload & {
        exp: number;
      };
      const staff = await this.authService.getOneFromUserId(payload.email);
      const isValid = staff.auth_key === refresh_token;
      if (isValid === false) {
        throw new Error('유효하지 않은 토큰');
      }
      const remain_days =
        (payload.exp * 1000 - Date.now()) / 1000 / 60 / 60 / 24;
      let new_refresh_token: string;
      if (remain_days < 4) {
        new_refresh_token = await this.authService.issueRefreshToken({
          email: payload.email,
          id: payload.id,
        });
      }

      const access_token = await this.authService.issueAccessToken({
        id: payload.id,
        email: payload.email,
      });

      if (new_refresh_token) {
        const decodedValue = this.jwtService.decode(
          new_refresh_token,
        ) as JwtPayload & {
          exp: number;
        };
        const expires = new Date(decodedValue.exp * 1000);
        res.cookie(this.refresh_token_name, new_refresh_token, {
          expires,
          sameSite: true,
          httpOnly: true,
        });
      }
      res.json({
        access_token,
      });
      res.end();
    } catch (e) {
      throw new UnauthorizedException('인증에 실패하였습니다.');
    }
  }

  @Get('logout')
  @UseGuards(AdminJwtGuard)
  async logout(@CurrentUser() staff: StaffDocument, @Res() res: Response) {
    await this.authService.clearRefreshToken(staff._id.toString());
    res.clearCookie(this.refresh_token_name);
    res.end();
  }

  @Post('reset-pw')
  resetPassword(@Body() body: EmailDto) {
    return this.authService.resetPassword(body.email);
  }
}
