import { IsDate, IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateElectionDto {
  @IsDate({ message: 'votingDate: precisa ser uma data válida' })
  @Type(() => Date)
  readonly votingDate: Date;

  @IsNotEmpty({ message: 'maxVote: é obrigatório' })
  @IsInt({ message: 'maxVote: precisa ser um número inteiro' })
  readonly maxVote: number;
}
