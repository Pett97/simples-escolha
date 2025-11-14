import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Election } from '@prisma/client';
import * as crypto from 'crypto';
import { customAlphabet } from 'nanoid';
import { NanoIdService } from 'src/common/services/nanoIdService';
import { PrismaService } from 'src/database/prisma.service';

import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { FailCreateElection } from './fail-create-election';
import { FailFindElection } from './fail-find-election';


@Injectable()
export class ElectionService {
  constructor(private prisma: PrismaService) { }

  private async findOneElection(id: number): Promise<Election> {
    if (!id) {
      throw new NotFoundException("Para Buscar uma Eleição informe um id");
    }
    return await this.prisma.election.findFirstOrThrow({ where: { id } });
  }

  private async getElectionMaxVote(id: number): Promise<number> {
    if (!id) {
      throw new BadRequestException("Para Buscar a quantidade maxima de votos informe um id valido ");
    }

    const election: Election = await this.findOneElection(id);
    if (!election) {
      throw new NotFoundException();
    }

    return election.maxVote;
  }

  //achei mais simples isso so para ter uma "segurança"
  async createTokensForElection(idElection: number) {
    if (!idElection) {
      throw new BadRequestException("Para criar os Token informe id eleicao");
    }

    const maxVote = await this.getElectionMaxVote(idElection);

    if (!maxVote) {
      throw new InternalServerErrorException("Erro ao buscar quantidade maxima de votos");
    }

    const tokens = Array.from({ length: maxVote }).map(() => {
      const { token, hashToken } = this.createRandonToken();
      return {
        token,
        hashToken,
        used: 0,
        electionId: idElection,
        dateExpiration: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      };
    });

    return this.saveTokens(tokens);
  }

  private async saveTokens(data) {
    return this.prisma.token.createMany({ data });
  }

  //para criar um para o usuario digitar acredito que 8 vai dar boa para testar
  private createRandonToken(): { token: string, hashToken: string } {
    const token = this.generateCustomToken();
    const hashToken = crypto.createHash('sha256').update(token).digest('hex');
    return { token, hashToken }
  }

  private generateCustomToken(): string {
    return customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 8)();
  }

  async create(createElectionDto: CreateElectionDto): Promise<Election> {

    try {
      return await this.prisma.election.create({ data: createElectionDto });
    } catch (error) {
      console.error(error);
      throw new FailCreateElection();
    }
  }

  async findAll(): Promise<Election[]> {
    const data: Election[] = await this.prisma.election.findMany();

    if (!data || data.length === 0) {
      throw new NotFoundException("Nao foi possivel listar as eleicoes");
    }

    return data;
  }

  async findOne(id: number): Promise<Election> {
    return this.findOneElection(id);
  }

  async findByDateRange(startDate: string, endDate: string): Promise<Election[]> {
    if (!startDate || !endDate) {
      throw new BadRequestException();
    }

    try {
      const data = await this.prisma.election.findMany({
        where: {
          votingDate: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      if (!data || data.length === 0) {
        throw new FailFindElection();
      }

      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateElectionDto: UpdateElectionDto): Promise<Election> {

    if (!id) {
      throw new BadRequestException("Para atualizar uma eleicao é necessário informar um id");
    }

    try {
      const election = await this.prisma.election.update({ where: { id }, data: updateElectionDto });

      if (!election) {
        throw new FailFindElection();
      }

      return election;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number): Promise<Election> {

    if (!id) {
      throw new BadRequestException();
    }

    try {
      const data = await this.prisma.election.delete({ where: { id } });
      if (!data) {
        throw new InternalServerErrorException(`Erro ao deletar eleicao com id ${id}`);
      }

      return data;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  private async getVotesByElectoralSlate(idElection: number) {
    if (!idElection) {
      throw new BadRequestException("Não é possivel buscar resultado sem informar uma eleicao");
    }

    const votesByElectoralSlate = await this.prisma.vote.groupBy({
      by: ['slateId'],
      where: {
        slate: { electionId: idElection },
      }, _count: { _all: true },
    });

    return votesByElectoralSlate;
  }

  async getResultElection(idElection: number) {
    const votes = await this.getVotesByElectoralSlate(idElection);

    const result = await Promise.all(
      votes.map(async (vote) => {
        const chapa = await this.prisma.electoralSlate.findUnique({
          where: { id: vote.slateId }
        });

        return {
          numberVote: chapa?.numberVote,
          candidate1: chapa?.candidate1,
          candidate2: chapa?.candidate2,
          totalVotes: vote._count._all,
        };
      })
    );

    return result;
  }




}
