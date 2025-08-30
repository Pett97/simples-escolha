import { IsInt, IsArray, ArrayNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateElectoralSlateDto {
  @IsOptional()
  @IsInt()
  readonly id?: number;

  @IsInt({ message: 'numberVote must be an integer' })
  readonly numberVote: number;

  @IsArray({ message: 'namesCandites must be an array' })
  @ArrayNotEmpty({ message: 'namesCandites cannot be empty' })
  @IsString({ each: true, message: 'Each candidate name must be a string' })
  readonly namesCandites: string[];
}
