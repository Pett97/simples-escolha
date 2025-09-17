import { Injectable } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as crypto from 'crypto';
import { Vote } from '@prisma/client';
import { ElectoralSlateService } from 'src/electoral-slate/electoral-slate.service';
@Injectable()
export class VoteService {

  constructor(private prisma: PrismaService, private electoralSlateService:ElectoralSlateService) { }


  private async handleErrors<T>(fn: () => Promise<T>, message = 'Erro ao processar requisição',): Promise<T | { message: string }> {
    try {
      return await fn();
    } catch (error) {
      console.error(message, error);
      return { message };
    }
  }

  private async validateVote(electionId: number, token: string): Promise<Boolean> {
    console.log({electionId:electionId,token:token});
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    console.log(hash);

    const tokenDb = await this.prisma.token.findFirst({
      where: { hash, electionId, used: 0 },
    });

    if (!tokenDb) {
      return false;
    }

    await this.prisma.token.update({
      where: { id: tokenDb.id },
      data: { used: 1 },
    });

    return true;
  }

  async create(createVoteDto: CreateVoteDto): Promise<Vote | { message: string }> {
    console.log("xxxx");

    const idChapa = await this.electoralSlateService.findByNumberVote(createVoteDto.numberVote);

    if (!idChapa) {
      return { message: "SEM CHAPA TIO" }
    }

    const teste = { ...createVoteDto, slateId: 1 };

    if (!this.validateVote(1, teste.hash)) {
      return { message: "erro a validar voto erro no HASH" };
    }
    
    return this.handleErrors(() => this.prisma.vote.create({ data: teste }), "erro ao cadastrar voto no BANCO");
  }

  findAll() {
    return `This action returns all vote`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
