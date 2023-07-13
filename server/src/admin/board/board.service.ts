import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Pagination } from 'src/common/paginate';
import { filterOptions } from 'src/common/paginate/filter.options';
import { SortOptions } from 'src/common/paginate/sort.options';
import { BoardRepository } from 'src/database/board-data/board.repository';
import { Media } from 'src/database/sub-schema/media.sub-schema';
import { UpdateOneDto } from './dto/updateOne.dto';
import { UploadedFile as S3UploadedFile } from 'src/file-upload/types/uploaded-file.interface';
import { formCreatedDate } from 'src/utils/DateUtil';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async getList(
    page: number,
    pageSize: number,
    sort: SortOptions,
    filter: filterOptions = {
      field: 'title',
      text: '',
    },
  ) {
    const { count, rows } = await this.boardRepository.getListAndCount(
      page,
      sort,
      filter,
    );

    return new Pagination({
      page_size: pageSize,
      rows,
      total_number: count,
    });
  }

  async getOne(id: Types.ObjectId) {
    const data = await this.boardRepository.getOne(id);
    const result = {
      title: data.title,
      content: data.content,
      image: data.image,
      update_at: formCreatedDate(data.updated_at),
    };
    return result;
  }

  async create(body: any, file?: S3UploadedFile) {
    if (file !== undefined) {
      try {
        await this.boardRepository.create({
          title: body.title,
          content: body.content,
          image: {
            name: file.originalName,
            size: file.size,
            type: file.mimetype,
            key: file.key,
            url: file.path,
          },
        });
      } catch (e) {
        Logger.error('공지사항 생성에 실패했습니다.');
        throw e;
      }
    } else {
      try {
        await this.boardRepository.create({
          title: body.title,
          content: body.content,
        });
      } catch (e) {
        Logger.error('공지사항 생성에 실패했습니다.');
        throw e;
      }
    }
  }

  async updateOne(id: string, data: UpdateOneDto, file?: S3UploadedFile) {
    try {
      const _id = new Types.ObjectId(id);
      const row = await await this.boardRepository.getOne(_id);
      if (!row) {
        throw new NotFoundException('찾을 수 없습니다.');
      }
      row.title = data.title;
      row.content = data.content;
      if (file) {
        row.image = {
          name: file.originalName,
          size: file.size,
          type: file.mimetype,
          key: file.key,
          url: file.path,
        };
      }
      await row.save();
      return _id;
    } catch (e) {
      Logger.error('공지사항 수정에 실패했습니다.');
      throw e;
    }
  }

  async deleteOne(_id: Types.ObjectId) {
    await this.boardRepository.deleteOne(_id);
  }
}
