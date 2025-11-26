import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateElectoralSlateDto {
  @IsNotEmpty({message: 'numberVote não pode vazio'})
  @IsInt({ message: 'numberVote :Número da chapa é obrigatório' })
  readonly numberVote: number;

  @IsNotEmpty({ message: "candidate1:Nome do candidato 1 é obrigatório" })
  @IsString({ message: "candidate1:Nome do candidato 1: apenas letras" })
  readonly candidate1: string;

  @IsOptional()
  @IsString({ message: "candidate2: Nome do candidato 2: apenas letras" })
  readonly candidate2?: string;

  @IsNotEmpty({message: 'electionId não pode ser vazio'})
  @IsInt({ message: 'electionId :Número da chapa é obrigatório' })
  readonly electionId:number;

}
