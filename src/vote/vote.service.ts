import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ElectoralSlate, Vote } from '@prisma/client';
import * as crypto from 'crypto';
import { PrismaService } from 'src/database/prisma.service';
import { ElectoralSlateService } from 'src/electoral-slate/electoral-slate.service';

import { CreateVoteDto } from './dto/create-vote.dto';
import { InvalidTokenException } from './entities/invalid-token.exception';

@Injectable()
export class VoteService {

  constructor(private prisma: PrismaService, private electoralSlateService: ElectoralSlateService) { }

  private async validateVote(electionId: number, token: string): Promise<void> {
    console.log({ electionId: electionId, token: token });
    const hashDescripitada = crypto.createHash('sha256').update(token).digest('hex');
    const tokenDb = await this.prisma.token.findUnique({ where: { hashToken: hashDescripitada, used: 0 } });

    if (!tokenDb) {
      throw new InvalidTokenException();
    }

    await this.prisma.token.update({
      where: { id: tokenDb.id },
      data: { used: 1 },
    });

  }

  async create(createVoteDto: CreateVoteDto): Promise<Vote> {
    const chapa: ElectoralSlate | { message: string } = await this.electoralSlateService.findByNumberVote(createVoteDto.numberVote);

    if (!chapa || 'message' in chapa) {
      throw new NotFoundException("Chapa Não encontrada");
    }

    const voto = { ...createVoteDto, slateId: chapa.id };

    await this.validateVote(chapa.electionId, voto.hash);

    try {
      return await this.prisma.vote.create({
        data: { ...createVoteDto, slateId: chapa.id },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro ao cadastrar voto no banco',
      );

    }
  }

}
