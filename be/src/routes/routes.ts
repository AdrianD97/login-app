import { RequestHandler, Router } from 'express';
import { ValidateRequestHandler } from '../core/middleware/ValidateRequestHandler';
import { AuthMiddleware } from '../core/middleware/AuthHandler';
import { RouteMiddlewares } from '../types';

export abstract class Routes {
    protected router = Router();
    protected validateBodyHandler: ValidateRequestHandler;
    protected validateHeadersHandler: ValidateRequestHandler;
    private _authMiddleware: AuthMiddleware;

    constructor(routeMiddlewares: RouteMiddlewares) {
        this.validateBodyHandler = routeMiddlewares.validateBodyHandler;
        this.validateHeadersHandler = routeMiddlewares.validateHeadersHandler;
        this._authMiddleware = routeMiddlewares.authMiddleware;
    }

    protected checkAuthToken(): RequestHandler {
        return this._authMiddleware.checkToken.bind(this._authMiddleware);
    }

    public getRouter(): Router {
        return this.router;
    }

    protected abstract init(): void;
};
