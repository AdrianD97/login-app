import { Response, NextFunction, RequestHandler } from "express";
import { MESSAGE, STATUS_CODE } from "../core/types";
import { AuthMiddleware } from "../core/middleware/AuthHandler";
import { Config } from "../config/config";
import { TokenHandler } from "../core/auth_token/TokenHandler";
import { ServerError } from "../core/errors/ServerError";
import { Decorator } from "../core/decorators/Decorator";
import { ExtendedRequest } from "../types";

export class ValidateAuthTokenHandler<T> extends AuthMiddleware {
    private _tokenHandler: TokenHandler<T>;
    private _decorator: Decorator<ExtendedRequest, T>;

    constructor(tokenHandler: TokenHandler<T>, decorator: Decorator<ExtendedRequest, T>) {
        super();
        this._tokenHandler = tokenHandler;
        this._decorator = decorator;
    }

    public override async checkToken(req: ExtendedRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token: string = req.headers.authorization.split(' ')[1];
            const decodeToken: T = await this._tokenHandler.verify(token, Config.get('SECRET_KEY') as string);
            await this._decorator.decorate(req, decodeToken);

            next();
        } catch (error) {
            console.error(error);
            next(new ServerError(MESSAGE.INVALID_AUTH_TOKEN, STATUS_CODE.UNAUTHORIZED));
        }
    }
};
