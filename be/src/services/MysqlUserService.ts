import { Connection, ResultSetHeader } from "mysql2/promise";
import { UserService } from "../core/services/UserService";
import { User } from "../models/User";
import { Config } from "../config/config";

export class MysqlUserService<T> extends UserService<T, Connection, User> {
    public override async findById(id: number): Promise<User | undefined> {
        const [rows] = await this.dbConnection.connection().execute<User[]>(
            `SELECT * FROM ${UserService.TABLE_NAME} WHERE id = ? limit 1`,
            [id]
        );

        if (!rows.length) {
            return undefined;
        }

        return rows[0];
    }

    public override async create(data: Record<string, unknown>): Promise<User> {
        const { username, password, email, first_name, last_name, latitude, longitude } = data;

        const hashedPassword: string = await this.passwordEncrypter.hash(password as string);
        let query: string = `INSERT INTO ${UserService.TABLE_NAME} (username, password, email, first_name, last_name) VALUES (?, ?, ?, ?, ?)`;
        const values = [username, hashedPassword, email, first_name, last_name];

        if (latitude && longitude) {
            query = `INSERT INTO ${UserService.TABLE_NAME} (username, password, email, first_name, last_name, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            values.push(latitude, longitude);
        }

        const [result] = await this.dbConnection.connection().execute<ResultSetHeader>(query, values);
    
        return this.findById(result.insertId);
    }

    public override async findByUsername(username: string): Promise<User | undefined> {
        const [rows] = await this.dbConnection.connection().execute<User[]>(
            `SELECT * FROM ${UserService.TABLE_NAME} WHERE username = ? limit 1`,
            [username]
        );

        if (!rows.length) {
            return undefined;
        }

        return rows[0];
    }

    public override cmpPassword(user: User, password: string): Promise<boolean> {
        return this.passwordEncrypter.compare(password, user.password);
    }

    public override async createLoginResponse(user: User): Promise<Record<string, unknown>> {
        return {
            accessToken: await this.tokenHandler.sign(
                { username: user.username },
                Config.get('SECRET_KEY') as string,
                { expiresIn: Config.get('EXPIRES_IN') as number }
            )
        };
    }

    public override async createUserInfoResponse(user: User): Promise<Record<string, unknown>> {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            location: {
                latitude: user.latitude,
                longitude: user.longitude
            }
        };
    }
};
