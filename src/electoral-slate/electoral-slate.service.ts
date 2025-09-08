import { Injectable } from '@nestjs/common';
import { ElectoralSlate } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CreateElectoralSlateDto } from './dto/create-electoral-slate.dto';
import { UpdateElectoralSlateDto } from './dto/update-electoral-slate.dto';

@Injectable()
export class ElectoralSlateService {
  constructor(private prisma: PrismaService) {}

  private async findByIdOrThrow(id: number): Promise<ElectoralSlate> {
    return this.prisma.electoralSlate.findFirstOrThrow({ where: { id } });
  }

  private async handleErrors<T>(fn: () => Promise<T>, message = 'Erro ao processar requisição'): Promise<T | { message: string }> {
    try {
      return await fn();
    } catch (error) {
      console.error(message, error);
      return { message };
    }
  }

  async create(createDto: CreateElectoralSlateDto): Promise<ElectoralSlate | { message: string }> {
    return this.handleErrors(() => this.prisma.electoralSlate.create({ data: createDto }), 'Erro ao criar chapa');
  }

  async findByNumberVote(numberVote:number):Promise<ElectoralSlate | {message: string}>{
    return this.handleErrors(async()=>{
      const data = await this.prisma.electoralSlate.findFirstOrThrow({where :{numberVote}});
       return data? data : {message : `Ǹehuma Chapa encontrada com numero ${numberVote}`};
    });
  };

  async findOne(id: number): Promise<ElectoralSlate | { message: string }> {
    return this.handleErrors(() => this.findByIdOrThrow(id), 'Erro ao buscar chapa');
  }

  async findAll(): Promise<ElectoralSlate[] | { message: string }> {
    return this.handleErrors(async () => {
      const data = await this.prisma.electoralSlate.findMany();
      return data.length ? data : { message: 'Nenhuma chapa encontrada' };
    }, 'Erro ao buscar chapas');
  }

  async update(id: number, updateDto: UpdateElectoralSlateDto): Promise<ElectoralSlate | { message: string }> {
    return this.handleErrors(async () => {
      await this.findByIdOrThrow(id); 
      return this.prisma.electoralSlate.update({ where: { id }, data: updateDto });
    }, 'Erro ao atualizar chapa');
  }

  async remove(id: number): Promise<ElectoralSlate | { message: string }> {
    return this.handleErrors(async () => {
      await this.findByIdOrThrow(id); 
      return this.prisma.electoralSlate.delete({ where: { id } });
    }, 'Erro ao remover chapa');
  }
}
