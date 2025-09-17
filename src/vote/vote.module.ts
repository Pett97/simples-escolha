import { Module } from '@nestjs/common';
import { ElectoralSlateModule } from 'src/electoral-slate/electoral-slate.module';

import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';

@Module({
  imports:[ElectoralSlateModule],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
