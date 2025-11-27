import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateElectoralSlateDto {
  @ApiProperty({
    description: 'Número da chapa',
    example: 10,
  })
  @IsNotEmpty({ message: 'numberVote: não pode ser vazio' })
  @IsInt({ message: 'numberVote: precisa ser um número inteiro' })
  readonly numberVote: number;

  @ApiProperty({
    description: 'Nome do candidato 1 (obrigatório)',
    example: 'João Silva',
  })
  @IsNotEmpty({ message: 'candidate1: nome do candidato 1 é obrigatório' })
  @IsString({ message: 'candidate1: precisa ser um texto válido' })
  readonly candidate1: string;

  @ApiPropertyOptional({
    description: 'Nome do candidato 2 (opcional)',
    example: 'Maria Souza',
  })
  @IsOptional()
  @IsString({ message: 'candidate2: precisa ser um texto válido' })
  readonly candidate2?: string;

  @ApiProperty({
    description: 'ID da eleição vinculada',
    example: 1,
  })
  @IsNotEmpty({ message: 'electionId: não pode ser vazio' })
  @IsInt({ message: 'electionId: precisa ser um número inteiro' })
  readonly electionId: number;
}
