import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { AbstractFileUploadService } from './file-upload.service.abstract';
import { UploadedFile } from './types/uploaded-file.interface';

@Injectable()
export class YeonseiUploadService extends AbstractFileUploadService {
  protected async handleUpload(
    file: Express.Multer.File,
    service_id?: string,
    owner_id?: string,
  ): Promise<UploadedFile> {
    //TODO 추후 연결되면 연세대 파일 업로드 API테스트하기
    let yeonsei_uploadfile = null;
    if (service_id !== undefined && owner_id !== undefined) {
      try {
        //추후 실 API로 변경해야함
        const yeonseiURL = `${process.env.YEONSEI_API}/file-management/newFile`;
        const response = await axios.post(yeonseiURL, {
          serviceId: service_id,
          userId: owner_id,
          fileName: file.originalname,
        });
        yeonsei_uploadfile = response.data.url;
        //yeonsei_uploadfile = response.data.result;
      } catch (e) {
        yeonsei_uploadfile = null;
        console.log(e);
      }
    }
    //TODO 사이즈도 추후에 변경해야함 줄수있는거 없으면 그냥 내버려두기
    if (yeonsei_uploadfile !== null) {
      console.log(yeonsei_uploadfile);
      return {
        key: '미구현',
        mimetype: file.mimetype,
        originalName: file.originalname,
        path: yeonsei_uploadfile,
        size: 400,
      };
    } else {
      return {
        key: '미구현',
        mimetype: file.mimetype,
        originalName: file.originalname,
        path: 'AI_Plaza',
        size: 400,
      };
    }
  }
}
