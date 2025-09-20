import { Injectable } from '@nestjs/common';
import { Election } from '@prisma/client';
import * as crypto from 'crypto';
import { customAlphabet } from 'nanoid';
import { NanoIdService } from 'src/common/services/nanoIdService';
import { PrismaService } from 'src/database/prisma.service';

import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';

@Injectable()
export class ElectionService {

  constructor(private prisma: PrismaService, private nanoId: NanoIdService) { }

  private async findByIdOrThrow(id: number): Promise<Election> {
    return this.prisma.election.findFirstOrThrow({ where: { id } });
  }

  private async getElectionMaxVote(id: number): Promise<number | { message: string }> {
    return this.handleErrors(async () => {
      const election = await this.findByIdOrThrow(id);
      return election.maxVote;
    }, `não foi encontrada eleicao com id${id}`)
  }

  private async handleErrors<T>(fn: () => Promise<T>, message = 'Erro ao processar requisição'): Promise<T | { message: string }> {
    try {
      return await fn();
    } catch (error) {
      console.error(message, error);
      return { message };
    }
  }

  //achei mais simples isso so para ter uma "segurança"
  async createTokensForElection(idElection: number) {
    return this.handleErrors(async () => {
      const maxVote = await this.getElectionMaxVote(idElection);
      const totalTokens = Number(maxVote) || 50;

      const tokensData = Array.from({ length: totalTokens }).map(() => {
        const { token, hashToken } = this.createRandonToken();
        return {
          token,
          hashToken,
          used: 0,
          electionId: idElection,
          dateExpiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        };
      });

      return this.prisma.token.createMany({ data: tokensData });
    }, 'erro ao criar tokens');
  }

  //para criar um para o usuario digitar acredito que 8 vai dar boa para testar
  private createRandonToken(): { token: string, hashToken: string } {
    const generateToken = customAlphabet(
      '123456789ABCDEFGHJKLMNPQRSTUVWXYZ',
      8
    );
    const token = generateToken();

    const hashToken = crypto.createHash('sha256').update(token).digest('hex');

    return {
      token,
      hashToken
    }
  }

  async create(createElectionDto: CreateElectionDto): Promise<Election | { message: string }> {
    return this.handleErrors(() => this.prisma.election.create({ data: createElectionDto }), 'erro ao criar eleicao');
  }

  async findAll(): Promise<Election[] | { message: string }> {
    return this.handleErrors(() => this.prisma.election.findMany(), "não foi possivel buscar as eleicoes");
  }

  async findOne(id: number): Promise<Election | { message: string }> {
    return this.handleErrors(() => this.findByIdOrThrow(id), `não foi encontrado  nenhuma eleicao com esse ${id}`);
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Election[] | { message: string }> {
    return this.handleErrors(() =>
      this.prisma.election.findMany({
        where: {
          votingDate: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      })
    );
  }

  async update(id: number, updateElectionDto: UpdateElectionDto): Promise<Election | { message: string }> {
    return this.handleErrors(async () => {
      await this.findByIdOrThrow(id);
      return this.prisma.election.update({ where: { id }, data: updateElectionDto });
    }, `erro ao atualizar eleicao com id ${id}`)
  }

  async remove(id: number): Promise<Election | { message: string }> {
    return this.handleErrors(async () => {
      await this.findByIdOrThrow(id);
      return this.prisma.election.delete({ where: { id } });
    }, `não possivel remover eleicao com id ${id}`);
  }

  async getResultElection(idElection: number) {
    return this.handleErrors(async () => {
      const votosPorChapa = await this.prisma.vote.groupBy({
        by: ['slateId'],
        where: {
          slate: { electionId: idElection },
        },
        _count: { _all: true },
      });

      const resultado = await Promise.all(
        votosPorChapa.map(async (votoDaChapa) => {
          const chapa = await this.prisma.electoralSlate.findUnique({
            where: { id: votoDaChapa.slateId },
          });

          return {
            numberVote: chapa?.numberVote,
            candidate1: chapa?.candidate1,
            candidate2: chapa?.candidate2,
            totalVotes: votoDaChapa._count._all,
          };
        }),
      );

      return resultado;
    });
  }

}
