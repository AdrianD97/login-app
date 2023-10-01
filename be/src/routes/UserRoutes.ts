import { RequestHandler } from 'express';
import { Routes } from './routes';
import { RouteMiddlewares } from '../types';
import { ValidationSchema } from '../core/types';
import { UserController } from '../core/controllers/UserController';

export class UserRoutes<T, C, U> extends Routes {
    private _userController: UserController<T, C, U>;

    constructor (routeMiddlewares: RouteMiddlewares, userController: UserController<T, C, U>) {
        super(routeMiddlewares);
        this._userController = userController;
        this.init();
    }

    protected override init(): void {
        const getPersonFunc: RequestHandler = this._userController.get.bind(this._userController);

        this.router.get('/user', [
            this.validateHeadersHandler.validate(ValidationSchema.AUTHORIZATION),
            this.checkAuthToken()
        ], getPersonFunc);
    }
};
