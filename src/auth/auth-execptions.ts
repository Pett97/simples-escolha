import { HttpException, HttpStatus } from '@nestjs/common';

export class UserExceptions {

   static errorCreateUser() {
      return new HttpException(
         "Erro ao criar Usuario",
         HttpStatus.EXPECTATION_FAILED
      )
   }

   static userAlreadyExists() {
      return new HttpException(
         "Usuário já existe",
         HttpStatus.CONFLICT
      );
   }

   static userNotFound() {
      return new HttpException(
         "Usuário não encontrado",
         HttpStatus.NOT_FOUND
      );
   }

   static invalidPassword() {
      return new HttpException(
         "Senha inválida",
         HttpStatus.BAD_REQUEST
      );
   }
}
