import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteService } from './vote.service';

@ApiTags('vote')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  @Roles('USER')
  @ApiOperation({
    summary: 'Registrar um voto (USER)',
    description: 'Permite que um usuário autenticado registre um voto usando um hash válido.',
  })
  @ApiResponse({
    status: 201,
    description: 'Voto registrado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Erro de validação ou voto inválido.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado.',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário sem permissão (precisa ser USER).',
  })
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }
}
