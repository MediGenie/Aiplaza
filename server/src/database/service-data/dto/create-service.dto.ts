import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class ContentDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  @IsEmail()
  email: string;
  @Type(() => Number)
  @IsNumber()
  price: number;
}

class PageColumnDto {
  @IsString()
  key: string;
  @IsString()
  label: string;
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  color: string;
}

class PageDto {
  @IsString()
  key: string;
  @IsString()
  label: string;

  @Type(() => PageColumnDto)
  @IsArray()
  // @ValidateNested({ each: true })
  column: PageColumnDto[];
}

class FormDto {
  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  description: string;

  @Transform((params) => {
    const result = (params.value as Record<string, any>[]).map((item) => {
      const obj: any = {};

      Object.entries(item as Record<string, any>).forEach(([field, value]) => {
        if (field === 'image') {
          obj.image = value;
        } else {
          obj[field] = JSON.parse(value);
        }
      });
      return obj;
    });
    return result;
  })
  @IsArray()
  column: Record<string, any>[];
}

export class CreateServiceDto {
  @Type(() => ContentDto)
  @ValidateNested()
  content: ContentDto;

  @IsString()
  template: string;

  @Type(() => PageDto)
  @ValidateNested({ each: true })
  page: PageDto[];

  @Type(() => FormDto)
  @ValidateNested({ each: true })
  form: FormDto[];
}
