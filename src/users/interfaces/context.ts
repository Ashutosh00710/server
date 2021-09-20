import { Request, Response } from 'express';
import { User } from '../entities/users.entity';

export interface Ctx {
  req: Request & { user?: Pick<User, 'email' | 'firstname'> };
  res: Response;
}
