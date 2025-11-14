import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidTokenException extends HttpException {
   constructor() {
      super('Hash inválida ou já utilizada', HttpStatus.UNAUTHORIZED);
   }
}