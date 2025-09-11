
import { Injectable } from "@nestjs/common";
import { nanoid } from "nanoid";

//seria para ter um FACADES digamos do laravel
@Injectable()
export class NanoIdService {
   generateId(size = 21): string {
      return nanoid(size);
   }
}