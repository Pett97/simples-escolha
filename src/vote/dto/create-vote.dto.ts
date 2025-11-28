import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVoteDto {
  @ApiProperty({
    description: 'Hash único para validar o voto',
    example: 'a8726c1b92f14e3b9f8a12e87d91f3c2',
  })
  @IsString({ message: 'hash voto é obrigatório' })
  readonly hash: string;

  @ApiProperty({
    description: 'Número da chapa escolhida',
    example: 12,
  })
  @IsInt({ message: 'numero chapa é obrigatório' })
  readonly numberVote: number;
}
