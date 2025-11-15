import { Injectable } from "@nestjs/common";
import { customAlphabet } from "nanoid";

@Injectable()
export class NanoIdService {
   private readonly generator = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);

   generate(): string {
      return this.generator();
   }
}
