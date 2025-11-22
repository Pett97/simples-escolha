import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { NanoIdService } from 'src/common/services/nanoIdService';

@Module({
  providers: [UsersService,NanoIdService],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
