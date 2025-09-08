import { ElectoralSlate } from "src/electoral-slate/entities/electoral-slate.entity";

export class Election {
   id: number;
   votingDate: Date;
   maxVote: number;
   electoralSlate: ElectoralSlate[];
}
