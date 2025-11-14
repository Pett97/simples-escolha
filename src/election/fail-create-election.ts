import { HttpException, HttpStatus } from "@nestjs/common";

export class FailCreateElection extends HttpException {
   constructor() {
      super("Falha ao Criar Eleicao", HttpStatus.INTERNAL_SERVER_ERROR);
   }
}