import { TokenHandler } from "./core/auth_token/TokenHandler";
import { AuthController } from "./core/controllers/AuthController";
import { UserController } from "./core/controllers/UserController";
import { Decorator } from "./core/decorators/Decorator";
import { AuthMiddleware } from "./core/middleware/AuthHandler";
import { ErrorHandler } from "./core/middleware/ErrorHandler";
import { ValidateRequestHandler } from "./core/middleware/ValidateRequestHandler";
import { UserService } from "./core/services/UserService";
import { Validator } from "./core/validator/Validator";
import { Request } from "express";

export interface EnvVars {
    PORT: number;
    HOST: string;
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    ROUNDS: number;
    SECRET_KEY: string;
    EXPIRES_IN: number;
};

export interface ExtendedRequest extends Request {
    username: string;
};

export type ServerDependencies<T, C, U> = {
    validator: Validator;
    tokenHandler: TokenHandler<T>;
    errorHandler: ErrorHandler;
    authController: AuthController<T, C, U>;
    userController: UserController<T, C, U>;
    decorator: Decorator<ExtendedRequest, T>;
};

export type RouteMiddlewares = {
    validateBodyHandler: ValidateRequestHandler;
    validateHeadersHandler: ValidateRequestHandler;
    authMiddleware: AuthMiddleware;
};
