import { Module } from '@nestjs/common';

import { ElectionController } from './election.controller';
import { ElectionService } from './election.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[CommonModule],
  controllers: [ElectionController],
  providers: [ElectionService],
})
export class ElectionModule {}
