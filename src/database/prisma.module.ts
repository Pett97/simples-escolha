import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //teste ver se importa para todos 
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
