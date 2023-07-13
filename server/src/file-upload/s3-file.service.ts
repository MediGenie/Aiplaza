import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { AbstractFileUploadService } from './file-upload.service.abstract';
import { UploadedFile } from './types/uploaded-file.interface';
import { customAlphabet } from 'nanoid';

@Injectable()
export class S3FileService extends AbstractFileUploadService {
  private bucket: string;
  private s3: S3;
  private nanoid: (size?: number) => string;
  constructor(configService: ConfigService) {
    super();
    this.bucket = configService.getOrThrow('S3_BUCKET');
    this.s3 = new S3({
      accessKeyId: configService.getOrThrow('AWS_KEY_ID'),
      secretAccessKey: configService.getOrThrow('AWS_SECRET_KEY_ID'),
      signatureVersion: 'v4',
    });

    this.nanoid = customAlphabet(
      '1234567890abcedfghizklmnopqrstuvwxyzABCEDFGHIZKLMNOPQRSTUVWXYZ',
      32,
    );
  }

  private getExt(uri: string) {
    const ext = uri.split('.').pop();

    if (!ext) {
      throw new Error('잘못된 uri입니다.');
    }
    return ext;
  }

  private genKey(name: string) {
    const ext = this.getExt(name);
    const id = this.nanoid() + '-' + Date.now();
    const key = id + '.' + ext;
    return key;
  }

  protected async handleUpload(
    file: Express.Multer.File,
  ): Promise<UploadedFile> {
    const params: S3.PutObjectRequest = {
      Bucket: this.bucket,
      Key: this.genKey(file.originalname),
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      ACL: 'public-read',
    };
    try {
      const s3Response = await this.s3.upload(params).promise();
      return {
        key: s3Response.Key,
        mimetype: file.mimetype,
        path: s3Response.Location,
        size: file.size,
        originalName: file.originalname,
      };
    } catch (e) {
      // TODO 수정완료후 파일에러 문구 고치기
      throw new InternalServerErrorException(e);
    }
  }

  public deleteS3File(key: string) {
    return this.s3
      .deleteObject({ Bucket: this.bucket, Key: key })
      .promise()
      .then(() => console.log(key, '삭제 성공'))
      .catch(() => {
        console.log(key, '삭제 실패');
      });
  }
}
