import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElectoralSlateModule } from './electoral-slate/electoral-slate.module';
import { PrismaModule } from './database/prisma.module';
import { ElectionModule } from './election/election.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [ElectoralSlateModule,PrismaModule, ElectionModule, VoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
