import { Injectable } from '@nestjs/common';
import { CreateElectoralSlateDto } from './dto/create-electoral-slate.dto';
import { UpdateElectoralSlateDto } from './dto/update-electoral-slate.dto';

@Injectable()
export class ElectoralSlateService {
  create(createElectoralSlateDto: CreateElectoralSlateDto) {
    return createElectoralSlateDto;
  }

  findAll() {
    return `This action returns all electoralSlate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} electoralSlate`;
  }

  update(id: number, updateElectoralSlateDto: UpdateElectoralSlateDto) {
    return `This action updates a #${id} electoralSlate`;
  }

  remove(id: number) {
    return `This action removes a #${id} electoralSlate`;
  }
}
