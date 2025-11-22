
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import { NanoIdService } from 'src/common/services/nanoIdService';
import { UserExceptions } from './user-execptions';
import { User } from './entities/user.entity';
import { createCipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private nanoId: NanoIdService) { }

  private async encryptarSenha(senha:string){
    const iv = randomBytes(16);
    let novaSenha = (await promisify(scrypt)(senha,'salt',32)) as Buffer;
    let cipher = createCipheriv('aes-256-ctr',novaSenha,iv);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      let teste = createUserDto;

      await this.encryptarSenha(teste.password);

      

      return await this.prisma.user.create({
        data: createUserDto
      });
    } catch (error) {
      console.error(error);
      throw UserExceptions.errorCreateUser();
    }
  }
}
