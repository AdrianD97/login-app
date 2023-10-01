import { Request, Response, NextFunction } from "express";
import { Middleware } from "./Middleware";

export abstract class AuthMiddleware extends Middleware {
    public abstract checkToken(req: Request, res: Response, next: NextFunction): Promise<void>;
};
