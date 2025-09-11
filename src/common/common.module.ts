// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { NanoIdService } from './services/nanoIdService';

@Module({
  providers: [NanoIdService],
  exports: [NanoIdService],
})
export class CommonModule {}
