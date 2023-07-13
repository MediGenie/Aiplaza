import { Injectable } from '@nestjs/common';
import { ServiceRepository } from 'src/database/service-data/service.repository';

@Injectable()
export class CommonService {
  constructor(private readonly serviceRepository: ServiceRepository) {}
  getRequestResult(id: string) {
    return this.serviceRepository.getRequestResponse(id);
  }
}
