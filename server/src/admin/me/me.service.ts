import { Injectable } from '@nestjs/common';
import { StaffRepository } from 'src/database/staff-data/staff.repository';

@Injectable()
export class MeService {
  constructor(private readonly staffRepository: StaffRepository) {}

  async updateMe(_id: string, name: string, password: string) {
    await this.staffRepository.updateOne({ _id, name, password });
  }
}
