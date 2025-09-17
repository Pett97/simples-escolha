import { IsInt, IsString } from 'class-validator';
export class CreateVoteDto {

   @IsString({ message: "hash voto é obrigatorio" })
   readonly hash: string;

   @IsInt({ message: "numero chapa é obrigatorio" })
   readonly numberVote: number;
}
