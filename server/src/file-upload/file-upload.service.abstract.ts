import { UploadedFile } from './types/uploaded-file.interface';

export abstract class AbstractFileUploadService {
  protected correctCharacter(file: Express.Multer.File): Express.Multer.File {
    const corretedName = Buffer.from(file.originalname, 'latin1').toString(
      'utf-8',
    );
    file.originalname = corretedName;
    return file;
  }

  protected abstract handleUpload(
    file: Express.Multer.File,
    service_id?: string,
    owner_id?: string,
  ): Promise<UploadedFile>;

  public async fileUpload(
    file: Express.Multer.File,
    service_id?: string,
    owner_id?: string,
  ): Promise<UploadedFile> {
    const corrected_file = this.correctCharacter(file);
    const uploaded_file = await this.handleUpload(
      corrected_file,
      service_id,
      owner_id,
    );
    return uploaded_file;
  }
}
