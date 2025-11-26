import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const { name, login, password, role } = createUserDto;
    const checkLogin = await this.prisma.user.findUnique({
      where: { login },
    });

    if (checkLogin) {
      throw new ConflictException("Login já está em uso");
    }

    // Hash da senha
    const hashPwd = await bcrypt.hash(password, 10);

    // Criação do usuário (não retorna a senha)
    const newUser = await this.prisma.user.create({
      data: {
        name,
        login,
        password: hashPwd,
        role: role
      },
      select: {
        id: true,
        name: true,
        login: true,
      },
    });

    return newUser;
  }

  async login(login: string, password: string) {
    if (!login || !password) {
      throw new BadRequestException();
    }

    const user = await this.prisma.user.findUnique({
      where: { login },
    });

    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const pwdMatch = await bcrypt.compare(password, user.password);

    if (!pwdMatch) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const payload = { sub: user.id, login: user.login, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token
    };
  }
}
