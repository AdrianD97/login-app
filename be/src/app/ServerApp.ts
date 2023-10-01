import express from "express";
import cors from 'cors';
import { App } from "../core/app/app";
import { ValidateBodyHandler } from "../middleware/ValidateBodyHandler";
import { ValidateRequestHandler } from "../core/middleware/ValidateRequestHandler";
import { ValidateHeadersHandler } from "../middleware/ValidateHeadersHandler";
import { AuthMiddleware } from "../core/middleware/AuthHandler";
import { ValidateAuthTokenHandler } from "../middleware/ValidateAuthTokenHandler";
import { RouteMiddlewares, ServerDependencies } from "../types";
import { AuthRoutes } from "../routes/AuthRoutes";
import { UserRoutes } from "../routes/UserRoutes";

export class ServerApp<T, C, U> extends App {
    private _serverAppDependencies: ServerDependencies<T, C, U>;

    constructor(serverDependencies: ServerDependencies<T, C, U>) {
        super();
        this._serverAppDependencies = serverDependencies;
        this._setConfig();
    }

    protected _setConfig(): void {
        /* allow to receive requests with data in json format */
		this.app.use(express.json());

		/* enables cors */
		this.app.use(cors());

        const {
            validator,
            tokenHandler,
            errorHandler,
            authController,
            userController,
            decorator
        } = this._serverAppDependencies;

        /* add routes */
        const validateBodyHandler: ValidateRequestHandler = new ValidateBodyHandler(validator);
        const validateHeadersHandler: ValidateRequestHandler = new ValidateHeadersHandler(validator);
        const authMiddleware: AuthMiddleware = new ValidateAuthTokenHandler<T>(tokenHandler, decorator);

        const routeMiddlewares: RouteMiddlewares = {
            validateBodyHandler,
            validateHeadersHandler,
            authMiddleware
        };

        /* auth routes */
        this.app.use('/api/v1/auth/', new AuthRoutes<T, C, U>(routeMiddlewares, authController).getRouter());

        /* routes which handle user entries */
        this.app.use('/api/v1/users/', new UserRoutes(routeMiddlewares, userController).getRouter());

        /* add error handler - must be added as the last handler */
		this.app.use(errorHandler.handle.bind(errorHandler));
    }
};
