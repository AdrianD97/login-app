import { NextFunction, Response } from 'express';
import { MESSAGE, STATUS_CODE } from '../core/types';
import { UserController } from '../core/controllers/UserController';
import { ServerError } from '../core/errors/ServerError';
import { ExtendedRequest } from '../types';

export class UserAppController<T, C, U> extends UserController<T, C, U> {
    public override async get(req: ExtendedRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const user: U = await this.userService.findByUsername(req.username);

            if (!user) {
                throw new ServerError(MESSAGE.NOT_FOUND, STATUS_CODE.NOT_FOUND);
            }

            res.status(STATUS_CODE.OK).json({
                userData: await this.userService.createUserInfoResponse(user)
            });
        } catch (error) {
            next(error);
        }
    }
};
