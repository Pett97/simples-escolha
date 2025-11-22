import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrai JWT do header Bearer
      ignoreExpiration: false,  // rejeita tokens expirados automaticamente
      secretOrKey: process.env.JWT_SECRET || 'pett', // mesma chave usada no JwtModule
    });
  }

  // Método chamado após validação do token. 'payload' é o conteúdo decodificado do JWT.
  async validate(payload: any) {
    // Podemos extrair informações do payload. Aqui esperamos { sub: userId, email: email }
    const userId = payload.sub;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }  // remover campo sensível
    return user;  // O valor retornado aqui será atribuído a req.user
  }
}