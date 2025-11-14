import { HttpException, HttpStatus } from "@nestjs/common";

export class FailFindElection extends HttpException {
   constructor() {
      super("Falha ao Buscar Eleicao", HttpStatus.INTERNAL_SERVER_ERROR);
   }
}