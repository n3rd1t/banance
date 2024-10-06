import { Router } from 'express';
import { usersRouter } from './users';
import { authRouter } from './auth';
import { walletRouter } from './wallets';

export const mainRouter = Router();

mainRouter.use("/users", usersRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/wallet", walletRouter);