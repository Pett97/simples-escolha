import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: "name:Nome  é obrigatório" })
  @IsString({ message: "name:Nome apenas letras" })
  readonly name: string;

  @IsNotEmpty({ message: "password não pode ser vazio" })
  @MinLength(8, { message: "password deve ter no minimo oito caracteres" })
  readonly password: string;

  @IsNotEmpty({ message: "login não pode vazio" })
  readonly login: string;
}
