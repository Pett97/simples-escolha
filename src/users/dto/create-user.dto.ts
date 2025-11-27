import { Role } from '@prisma/client';
import { IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Mario Silva', description: 'Nome completo do usuário' })
  @IsNotEmpty({ message: 'name:Nome é obrigatório' })
  @IsString({ message: 'name:Nome apenas letras' })
  readonly name: string;

  @ApiProperty({
    example: 'senhaforte123',
    description: 'Senha (mínimo 8 caracteres)',
    writeOnly: true,
  })
  @IsNotEmpty({ message: 'password não pode ser vazio' })
  @MinLength(8, { message: 'password deve ter no minimo oito caracteres' })
  readonly password: string;

  @ApiProperty({ example: 'mario', description: 'Login único do usuário' })
  @IsNotEmpty({ message: 'login não pode vazio' })
  @IsString({ message: 'login deve ser uma string' })
  readonly login: string;

  @ApiProperty({
    enum: Object.values(Role),
    example: Role.USER,
    description: 'Papel/role do usuário',
  })
  @IsNotEmpty({ message: 'tipo ususario não pode ser vazio' })
  @IsEnum(Role, { message: 'role inválido' })
  readonly role: Role;
}
