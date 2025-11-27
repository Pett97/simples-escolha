import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

import { CreateElectoralSlateDto } from './dto/create-electoral-slate.dto';
import { UpdateElectoralSlateDto } from './dto/update-electoral-slate.dto';
import { ElectoralSlateService } from './electoral-slate.service';

@ApiTags('electoral-slate')
@Controller('electoral-slate')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ElectoralSlateController {
  constructor(
    private readonly electoralSlateService: ElectoralSlateService,
  ) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Criar uma nova chapa eleitoral (ADMIN)' })
  create(@Body() createElectoralSlateDto: CreateElectoralSlateDto) {
    return this.electoralSlateService.create(createElectoralSlateDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as chapas eleitorais (Autenticado)' })
  findAll() {
    return this.electoralSlateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar chapa eleitoral por ID (Autenticado)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  findOne(@Param('id') id: string) {
    return this.electoralSlateService.findOne(+id);
  }

  @Get('number-vote/:numberVote')
  @ApiOperation({
    summary: 'Buscar chapa eleitoral pelo número de voto (Autenticado)',
  })
  @ApiParam({ name: 'numberVote', type: Number, example: 10 })
  findByNumberVote(@Param('numberVote') numberVote: string) {
    return this.electoralSlateService.findByNumberVote(+numberVote);
  }

  @Get('by-election/:id')
  @ApiOperation({
    summary: 'Listar chapas de uma eleição pelo ID da eleição (Autenticado)',
  })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  findByElectionId(@Param('id') id: number) {
    return this.electoralSlateService.findByElectionId(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualizar uma chapa eleitoral (ADMIN)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  update(
    @Param('id') id: string,
    @Body() updateElectoralSlateDto: UpdateElectoralSlateDto,
  ) {
    return this.electoralSlateService.update(+id, updateElectoralSlateDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Remover uma chapa eleitoral (ADMIN)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  remove(@Param('id') id: string) {
    return this.electoralSlateService.remove(+id);
  }
}
