import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountRepository } from 'src/database/account-data/account.repository';
import {
  AccountStatus,
  AccountType,
  RegisterFrom,
} from 'src/database/schema/account.schema';
import { S3FileService } from 'src/file-upload/s3-file.service';
import { CreateFromEmailDto } from './dto/create-from-email.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { Types } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { CreateFromSocialDto } from './dto/create-from-social.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
    private readonly s3FileService: S3FileService,
    private readonly mailService: MailService,
  ) {}

  private issueToken(payload: JwtPayload, expiresIn = '15m') {
    const token = this.jwtService.sign(payload, { expiresIn });
    return token;
  }

  async issueAccessToken(payload: JwtPayload) {
    return this.issueToken(payload);
  }

  async issueRefreshToken(payload: JwtPayload) {
    const token = this.issueToken(payload, '30 days');
    await this.accountRepository.updateRefreshToken(payload.id, token);

    return token;
  }

  async credentialValidate(
    username: string,
    password: string,
    account_type: AccountType,
  ) {
    const account = await this.accountRepository.getOneFromEmail(
      username,
      account_type,
    );
    if (account?.deleted_at !== undefined && account.deleted_at !== null) {
      throw new UnauthorizedException({
        message: '탈퇴한 회원입니다.',
      });
    }

    if (!account || account.register_from !== RegisterFrom.EMAIL) {
      throw new UnauthorizedException({
        message: '계정이 존재하지 않습니다.',
      });
    }

    if (account.status !== AccountStatus.GRANT) {
      throw new UnauthorizedException({
        message: '계정이 승인 상태가 아닙니다.',
      });
    }

    const isValid = this.accountRepository.compareHash(
      password,
      account.password,
    );

    if (isValid === false) {
      throw new UnauthorizedException({
        message: '비밀번호가 일치하지 않습니다.',
      });
    }
    return account;
  }

  async signUpFromEmail(body: CreateFromEmailDto, file: Express.Multer.File) {
    const isDuplicate = await this.accountRepository.checkEmailDuplicate(
      body.email,
      body.type,
    );

    if (isDuplicate) {
      throw new BadRequestException('중복된 이메일 입니다.');
    }

    const uploaded_file = await this.s3FileService.fileUpload(file);

    try {
      await this.accountRepository.create({
        name: body.name,
        address: body.address,
        address_detail: body.address_detail,
        analysis_field: body.analysis_field,
        research_field: body.research_field,
        biz_regist_cert_file: {
          key: uploaded_file.key,
          name: uploaded_file.originalName,
          size: uploaded_file.size,
          type: uploaded_file.mimetype,
          url: uploaded_file.path,
        },
        country: body.country,
        register_from: RegisterFrom.EMAIL,
        status: AccountStatus.READY,
        tel: body.tel,
        type: body.type,
        user_type: body.user_type,
        email: body.email,
        password: body.password,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        '계정을 생성하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async signUpFromSocial(body: CreateFromSocialDto, file: Express.Multer.File) {
    const isDuplicate = await this.accountRepository.checkEmailDuplicate(
      `${body.email}`,
      body.type,
    );
    if (isDuplicate) {
      throw new BadRequestException('중복된 이메일 입니다.');
    }
    const uploaded_file = await this.s3FileService.fileUpload(file);

    try {
      await this.accountRepository.create({
        name: body.name,
        address: body.address,
        address_detail: body.address_detail,
        analysis_field: body.analysis_field,
        research_field: body.research_field,
        password: body.social_key,
        biz_regist_cert_file: {
          key: uploaded_file.key,
          name: uploaded_file.originalName,
          size: uploaded_file.size,
          type: uploaded_file.mimetype,
          url: uploaded_file.path,
        },
        country: body.country,
        register_from: body.social_method as any,
        status: AccountStatus.READY,
        tel: body.tel,
        type: body.type,
        user_type: body.user_type,
        email: body.email,
        social_key: body.social_key,
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        '계정을 생성하는 도중 오류가 발생하였습니다.',
      );
    }
  }

  async getUserFromRefreshToken(refresh_token: string) {
    if (refresh_token === '') {
      throw new BadRequestException('세션이 존재하지 않습니다.');
    }
    const _payload = this.jwtService.verify(refresh_token) as JwtPayload;
    const user = await this.accountRepository.getOne(
      new Types.ObjectId(_payload.id),
    );
    if (user.deleted_at !== null) {
      throw new BadRequestException('사용이 불가능한 사용자입니다.');
    }
    if (!user) {
      throw new BadRequestException('사용자가 유효하지 않습니다.');
    }
    if (user.auth_key !== refresh_token) {
      throw new BadRequestException('사용자가 유효하지 않습니다.');
    }

    return user;
  }

  getOne(id: string) {
    return this.accountRepository.getOne(new Types.ObjectId(id));
  }
  clearRefreshToken(id: string) {
    return this.accountRepository.updateRefreshToken(id, '');
  }

  async withdrawl(id: string) {
    return await this.accountRepository.updateRefreshTokenWithdrawlAccount(
      id,
      '',
    );
  }

  socialLogin(
    type: 'consumer' | 'provider',
    social_key: string,
    register_from:
      | RegisterFrom.APPLE
      | RegisterFrom.NAVER
      | RegisterFrom.GOOGLE,
  ) {
    return this.accountRepository.getSocialUser(
      social_key,
      type === 'consumer' ? AccountType.CONSUMER : AccountType.PROVIDER,
      register_from,
    );
  }

  private generateRandomPwd(length: number) {
    let result = '';
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const characters = `${alphabet}${number}`;
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async resetPassword(email: string, type: AccountType) {
    const account = await this.accountRepository.getOneFromEmail(email, type);
    if (!account) {
      throw new BadRequestException('가입되지 않은 이메일입니다.');
    }
    if (account.deleted_at !== null) {
      throw new BadRequestException('탈퇴된 계정입니다.');
    }
    const temp_password = this.generateRandomPwd(10);
    await this.accountRepository.updatePassword(
      account._id.toString(),
      temp_password,
    );

    await this.mailService.sendUserPwMail(email, type, temp_password);
  }
}
