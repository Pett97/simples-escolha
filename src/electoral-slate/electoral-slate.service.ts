import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ElectoralSlate } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CreateElectoralSlateDto } from './dto/create-electoral-slate.dto';
import { UpdateElectoralSlateDto } from './dto/update-electoral-slate.dto';
import { FailCreateElectoralSlate } from './fail-create-electoral-slate';

@Injectable()
export class ElectoralSlateService {
  constructor(private prisma: PrismaService) { }

  async create(createDto: CreateElectoralSlateDto): Promise<ElectoralSlate> {
    try {
      return await this.prisma.electoralSlate.create({ data: createDto });
    } catch (error) {
      console.error(error);
      throw new FailCreateElectoralSlate();
    }
  }

  async findByNumberVote(numberVote: number): Promise<ElectoralSlate> {
    const data: ElectoralSlate | null = await this.prisma.electoralSlate.findFirst({
      where: { numberVote }
    })
    if (!data) {
      throw new NotFoundException("Erro ao buscar chapa pelo numero");
    }
    return data;
  }

  async findOne(id: number): Promise<ElectoralSlate> {
    const data: ElectoralSlate | null = await this.prisma.electoralSlate.findFirst({
      where: { id }
    })
    if (!data) {
      throw new NotFoundException("Erro ao buscar chapa pelo id");
    }
    return data;

  }

  async findAll(): Promise<ElectoralSlate[]> {
    const data: ElectoralSlate[] = await this.prisma.electoralSlate.findMany();
    if (data.length === 0) {
      throw new NotFoundException("Erro ao buscar as chapas");
    }
    return data;
  }

  async update(id: number, updateDto: UpdateElectoralSlateDto): Promise<ElectoralSlate> {
    if (!id) {
      throw new BadRequestException("Para atualizar uma chapa é necessário informar um id");
    }
    try {
      return await this.prisma.electoralSlate.update({
        where: { id },
        data: updateDto,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(`Erro ao atualiza chapa com id:${id}`);
    }
  }

  async remove(id: number): Promise<ElectoralSlate> {
    if (!id) {
      throw new BadRequestException("Erro para remover uma chapa é necessário umd id");
    }
    try {
      return await this.prisma.electoralSlate.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(`Erro ao remover chapa com id ${id}`);
    }
  }

  async findByElectionId(id: number): Promise<ElectoralSlate[]> {
    if (!id) {
      throw new BadRequestException("Erro para remover uma chapa é necessário uma id");
    }
    try {
      return await this.prisma.electoralSlate.findMany({
        where: { electionId: id }
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException("Erro");
    }
  }
}
