import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/database/prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({
    defaultStrategy: 'jwt'
  }), JwtModule.register({
    secret: process.env.JWT_KEY || "pett",
    signOptions: { expiresIn: '2h' }
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,PrismaService],
  exports:[AuthService]
})
export class AuthModule { }
