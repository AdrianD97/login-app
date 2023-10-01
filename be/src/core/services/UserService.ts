import { TokenHandler } from "../auth_token/TokenHandler";
import { Database } from "../db/Database";
import { PasswordEncrypter } from "../encrypter/PasswordEncrypter";
import { ServerError } from "../errors/ServerError";
import { MESSAGE, STATUS_CODE } from "../types";
import { CrudService } from "./CrudService";

export abstract class UserService<T, C, U> extends CrudService<C, U> {
    protected passwordEncrypter: PasswordEncrypter;
    protected tokenHandler: TokenHandler<T>;
    protected static readonly TABLE_NAME: string = 'users';

    constructor(dbConnection: Database<C>, passwordEncrypter: PasswordEncrypter, tokenHandler: TokenHandler<T>) {
        super(dbConnection);
        this.passwordEncrypter = passwordEncrypter;
        this.tokenHandler = tokenHandler;
    }

    public abstract findByUsername(username: string): Promise<U | undefined>;

    public abstract cmpPassword(user: U, password: string): Promise<boolean>;

    public abstract createLoginResponse(user: U): Promise<Record<string, unknown>>;

    public abstract createUserInfoResponse(user: U): Promise<Record<string, unknown>>;

    public override async findAll(): Promise<U[]> {
        throw new ServerError(MESSAGE.NOT_IMPLEMENTED, STATUS_CODE.NOT_IMPLEMENTED);
    }

    public override async update(id: number, data: Record<string, unknown>): Promise<U | undefined> {
        throw new ServerError(MESSAGE.NOT_IMPLEMENTED, STATUS_CODE.NOT_IMPLEMENTED);
    }

    public override async delete(id: number): Promise<number> {
        throw new ServerError(MESSAGE.NOT_IMPLEMENTED, STATUS_CODE.NOT_IMPLEMENTED);
    }

};
