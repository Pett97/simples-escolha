import { Module } from '@nestjs/common';
import { ElectoralSlateService } from './electoral-slate.service';
import { ElectoralSlateController } from './electoral-slate.controller';

@Module({
  controllers: [ElectoralSlateController],
  providers: [ElectoralSlateService],
})
export class ElectoralSlateModule {}
