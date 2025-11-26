import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ElectoralSlateService } from './electoral-slate.service';
import { CreateElectoralSlateDto } from './dto/create-electoral-slate.dto';
import { UpdateElectoralSlateDto } from './dto/update-electoral-slate.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('electoral-slate')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ElectoralSlateController {
  constructor(private readonly electoralSlateService: ElectoralSlateService) { }


  @Post()
  @Roles('ADMIN')
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


  @Patch(':id')
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() updateElectoralSlateDto: UpdateElectoralSlateDto) {
    return this.electoralSlateService.update(+id, updateElectoralSlateDto);
  }


  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.electoralSlateService.remove(+id);
  }
}
