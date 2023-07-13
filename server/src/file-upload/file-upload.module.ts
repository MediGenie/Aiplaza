import { Module } from '@nestjs/common';
import { S3FileService } from './s3-file.service';
import { YeonseiUploadService } from './yeonsei-upload.service';

@Module({
  providers: [S3FileService, YeonseiUploadService],
  exports: [S3FileService, YeonseiUploadService],
})
export class FileUploadModule {}
