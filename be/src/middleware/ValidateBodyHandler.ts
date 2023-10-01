import { Request, Response, NextFunction, RequestHandler } from "express";
import { ValidateRequestHandler } from "../core/middleware/ValidateRequestHandler";

export class ValidateBodyHandler extends ValidateRequestHandler {
    public override validate(schema: string): RequestHandler {
        return async (req: Request, _: Response, next: NextFunction): Promise<void> => {
            await this._validateData(schema, req.body, next);
        };
    }
};
