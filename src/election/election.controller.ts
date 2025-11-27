import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ElectionService } from './election.service';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('election')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ElectionController {
  constructor(private readonly electionService: ElectionService) { }
  @Post()
  @Roles('ADMIN')
  create(@Body() createElectionDto: CreateElectionDto) {
    return this.electionService.create(createElectionDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.electionService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electionService.findOne(+id);
  }

  @Public()
  @Get('result/:id')
  getResultadoElectionByIdElection(@Param('id') id: string) {
    return this.electionService.getResultElection(+id);
  }

  @Get('election-date/:startDate/:endDate')
  findByDate(@Param() params: { startDate: string; endDate: string }) {
    return this.electionService.findByDateRange(params.startDate, params.endDate);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectionDto: UpdateElectionDto) {
    return this.electionService.update(+id, updateElectionDto);
  }

  @Roles('ADMIN')
  @Post('create-tokens/:id')
  createTokens(@Param('id') id: string) {
    return this.electionService.createTokensForElection(+id);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electionService.remove(+id);
  }
}

