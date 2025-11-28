import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class VoteMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.method === 'POST') {
      const body = req.body || {};

      if (!body.hash) {
        return res.status(400).json({
          message: 'Para Votar é necessário informar o hash do vote',
        });
      }
    }

    next();
  }
}
