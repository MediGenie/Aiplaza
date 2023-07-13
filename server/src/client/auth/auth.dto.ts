import { IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { RegisterFrom } from 'src/database/schema/account.schema';

export class SignInAccountTypeDto {
  @IsEnum(['provider', 'consumer'])
  type: 'provider' | 'consumer';
}
export class SignInAccountBodyDto {
  @IsString()
  id: string;
  @IsEnum([RegisterFrom.APPLE, RegisterFrom.NAVER, RegisterFrom.GOOGLE])
  type: RegisterFrom.APPLE | RegisterFrom.NAVER | RegisterFrom.GOOGLE;
  @IsBoolean()
  isPersist: boolean;
}

export class EmailDto {
  @IsString({
    message: '문자열으로 입력해 주세요.',
  })
  @IsEmail(undefined, {
    message: '이메일 형식으로 입력해 주세요.',
  })
  email: string;
}
