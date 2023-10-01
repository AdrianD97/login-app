import { NextFunction, Request, Response } from "express";
import { Controller } from "./Controller";
import { UserService } from "../services/UserService";

export abstract class UserController<T, C, U> extends Controller {
    protected userService: UserService<T, C, U>;

    constructor(userService: UserService<T, C, U>) {
        super();
        this.userService = userService;
    }

    public abstract get(req: Request, res: Response, next: NextFunction): Promise<void>;
};
