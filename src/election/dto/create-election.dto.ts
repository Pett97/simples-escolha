import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateElectionDto {
  @ApiProperty({
    example: '2025-12-10T15:00:00.000Z',
    description: 'Data da votação (ISO String)',
    type: String,
  })
  @IsNotEmpty({ message: 'votingDate: é obrigatório' })
  @IsDate({ message: 'votingDate: precisa ser uma data válida' })
  @Type(() => Date)
  readonly votingDate: Date;

  @ApiProperty({
    example: 3,
    description: 'Número máximo de votos permitidos',
  })
  @IsNotEmpty({ message: 'maxVote: é obrigatório' })
  @IsInt({ message: 'maxVote: precisa ser um número inteiro' })
  readonly maxVote: number;
}
