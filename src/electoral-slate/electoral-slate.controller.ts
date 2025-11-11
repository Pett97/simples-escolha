import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ElectoralSlateService } from './electoral-slate.service';
import { CreateElectoralSlateDto } from './dto/create-electoral-slate.dto';
import { UpdateElectoralSlateDto } from './dto/update-electoral-slate.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('electoral-slate')
export class ElectoralSlateController {
  constructor(private readonly electoralSlateService: ElectoralSlateService) { }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createElectoralSlateDto: CreateElectoralSlateDto) {
    return this.electoralSlateService.create(createElectoralSlateDto);
  }

  @Get()
  findAll() {
    return this.electoralSlateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.electoralSlateService.findOne(+id);
  }

  @Get('number-vote/:numberVote')
  findByNumberVote(@Param('numberVote') numberVote: string) {
    return this.electoralSlateService.findByNumberVote(+numberVote);
  }

  @Get('by-election/:id')
  findByElectionId(@Param('id') id: number) {
    return this.electoralSlateService.findByElectionId(+id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElectoralSlateDto: UpdateElectoralSlateDto) {
    return this.electoralSlateService.update(+id, updateElectoralSlateDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.electoralSlateService.remove(+id);
  }
}
