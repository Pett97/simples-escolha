import { HttpException, HttpStatus } from "@nestjs/common";

export class FailCreateElectoralSlate extends HttpException {
   constructor() {
      super("Falha ao Criar Chapa", HttpStatus.INTERNAL_SERVER_ERROR);
   }
}