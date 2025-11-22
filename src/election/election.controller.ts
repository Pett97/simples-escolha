import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ElectionService } from './election.service';
import { CreateElectionDto } from './dto/create-election.dto';
import { UpdateElectionDto } from './dto/update-election.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';

@Controller('election')
@UseGuards(JwtAuthGuard)
export class ElectionController {
  constructor(private readonly electionService: ElectionService) { }

  @Post()
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
  @Get('resultado/:id')
  getResultadoElectionByIdElection(@Param('id') id: string) {
    return this.electionService.getResultElection(+id);
  }

  @Get('election-date/:startDate/:endDate')
  findByDate(@Param() params: { startDate: string; endDate: string }) {
    return this.electionService.findByDateRange(params.startDate, params.endDate);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectionDto: UpdateElectionDto) {
    return this.electionService.update(+id, updateElectionDto);
  }

  @Post('criar-tokens/:id')
  createTokens(@Param('id') id: string) {
    return this.electionService.createTokensForElection(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electionService.remove(+id);
  }
}

