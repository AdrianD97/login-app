import { Database } from "../db/Database";

export abstract class BasicService<C> {
    protected dbConnection: Database<C>;

    constructor(dbConnection: Database<C>) {
        this.dbConnection = dbConnection;
    }
};
