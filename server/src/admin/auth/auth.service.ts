import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { StaffRepository } from 'src/database/staff-data/staff.repository';
import { MailService } from 'src/mail/mail.service';
import { JwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {
    this.adminInitialized();
  }

  private async adminInitialized() {
    const initEmail = 'admin@aiplaza.com';
    const initPassword = 'password123';
    const initName = '기본 관리자';
    const storedAdmin = await this.staffRepository.getOneFromUserId(initEmail);

    if (storedAdmin === null) {
      const admin = await this.staffRepository.create({
        user_id: initEmail,
        password: initPassword,
        name: initName,
      });
      await admin.save();
      Logger.debug('created default admin account.');
    }
  }

  async credentialValidate(email: string, password: string) {
    const staff = await this.staffRepository.getOneFromUserId(email);
    if (!staff) {
      throw new UnauthorizedException({
        type: 'username',
        message: '계정이 존재하지 않습니다.',
      });
    }
    const isValid = this.staffRepository.compareHash(password, staff.password);

    if (isValid === false) {
      throw new UnauthorizedException({
        type: 'password',
        message: '비밀번호가 일치하지 않습니다.',
      });
    }

    return staff;
  }

  async getOneFromUserId(user_id: string) {
    const staff = await this.staffRepository.getOneFromUserId(user_id).lean();
    return staff;
  }

  private issueToken(payload: JwtPayload, expiresIn = '15m') {
    const token = this.jwtService.sign(payload, { expiresIn });
    return token;
  }

  async issueAccessToken(payload: JwtPayload) {
    return this.issueToken(payload);
  }

  async issueRefreshToken(payload: JwtPayload) {
    const token = this.issueToken(payload, '30 days');
    await this.staffRepository.updateRefreshToken(payload.id, token);

    return token;
  }

  async clearRefreshToken(id: string) {
    await this.staffRepository.updateRefreshToken(id, '');
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

  async resetPassword(email: string) {
    const staffAccount = await this.staffRepository.getOneFromUserId(email);
    if (!staffAccount) {
      throw new BadRequestException('존재하지 않는 계정입니다.');
    }
    if (staffAccount.deleted_at !== null) {
      throw new BadRequestException('탈퇴한 계정입니다.');
    }
    const temp_password = this.generateRandomPwd(10);
    await this.staffRepository.updatePassword(
      staffAccount._id.toString(),
      temp_password,
    );

    await this.mailService.sendAuthPwMail(email, temp_password);
  }
}
