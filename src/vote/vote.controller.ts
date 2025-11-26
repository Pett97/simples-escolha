import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteService } from './vote.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) { }

  @Post()
  @Roles('USER')
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.voteService.create(createVoteDto);
  }
}
