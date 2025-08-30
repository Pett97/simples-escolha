import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElectoralSlateModule } from './electoral-slate/electoral-slate.module';

@Module({
  imports: [ElectoralSlateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
