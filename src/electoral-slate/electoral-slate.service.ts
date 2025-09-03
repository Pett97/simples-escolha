import { Injectable } from '@nestjs/common';
import { ElectoralSlate } from 'generated/prisma';
import { PrismaService } from 'src/database/prisma.service';

import { CreateElectoralSlateDto } from './dto/create-electoral-slate.dto';
import { UpdateElectoralSlateDto } from './dto/update-electoral-slate.dto';

@Injectable()
export class ElectoralSlateService {
  constructor(private prisma: PrismaService) {}
  

  create(createElectoralSlateDto: CreateElectoralSlateDto) {
    return createElectoralSlateDto;
  }

  async findAll(): Promise<ElectoralSlate[] | { message: string }> {
    try {
      const electorals = await this.prisma.electoralSlate.findMany();

      if (!electorals || electorals.length === 0) {
        return { message: 'Nenhum registro encontrado' };
      }

      return electorals;
    } catch (error) {
      console.error('Erro no findAll:', error);
      return { message: 'Erro ao buscar os registros' };
    }
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
