import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { ElectionModule } from './election/election.module';
import { ElectoralSlateModule } from './electoral-slate/electoral-slate.module';
import { VoteMiddleware } from './vote/vote.middleware';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [ElectoralSlateModule, PrismaModule, ElectionModule, VoteModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VoteMiddleware).forRoutes('vote')
  }
}
