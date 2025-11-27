import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { ElectionService } from './election.service';

@ApiTags('election')
@Controller('election')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ElectionController {
  constructor(private readonly electionService: ElectionService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Criar uma nova eleição (ADMIN)' })
  create(@Body() createElectionDto: CreateElectionDto) {
    return this.electionService.create(createElectionDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Listar todas as eleições (Público)' })
  findAll() {
    return this.electionService.findAll();
  }

  @Public()
  @Get('result/:id')
  @ApiOperation({ summary: 'Buscar resultado da eleição pelo ID (Público)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  getResultadoElectionByIdElection(@Param('id') id: string) {
    return this.electionService.getResultElection(+id);
  }

  @Get('election-date/:startDate/:endDate')
  @ApiOperation({ summary: 'Buscar eleições entre duas datas (Autenticado)' })
  @ApiParam({
    name: 'startDate',
    type: String,
    example: '2025-01-01',
    description: 'Data inicial (YYYY-MM-DD)',
  })
  @ApiParam({
    name: 'endDate',
    type: String,
    example: '2025-12-31',
    description: 'Data final (YYYY-MM-DD)',
  })
  findByDate(@Param() params: { startDate: string; endDate: string }) {
    return this.electionService.findByDateRange(params.startDate, params.endDate);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Buscar eleição por ID (Público)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  findOne(@Param('id') id: string) {
    return this.electionService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar eleição por ID (ADMIN)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  update(@Param('id') id: string, @Body() updateElectionDto: UpdateElectionDto) {
    return this.electionService.update(+id, updateElectionDto);
  }

  @Roles('ADMIN')
  @Post('create-tokens/:id')
  @ApiOperation({
    summary: 'Gerar tokens para a eleição especificada (ADMIN)',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  createTokens(@Param('id') id: string) {
    return this.electionService.createTokensForElection(+id);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Remover eleição por ID (ADMIN)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  remove(@Param('id') id: string) {
    return this.electionService.remove(+id);
  }
}
