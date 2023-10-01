import { ValidationSchema } from "./core/types";
import { Validator } from "./core/validator/Validator";
import { AjvValidator } from "./validator/AjvValidator";
import { AuthorizationSchema, LoginSchema } from "./schemas";
import { Config } from "./config/config";
import { JwtTokenHandler } from "./auth_token/JwtTokenHandler";
import { ServerDependencies } from "./types";
import { JwtPayload } from "jsonwebtoken";
import { ServerErrorHandler } from "./middleware/ServerErrorHandler";
import { AuthAppController } from "./controllers/AuthAppController";
import { ServerApp } from "./app/ServerApp";
import { MysqlDatabase } from "./db/MysqlDatabase";
import { MysqlUserService } from "./services/MysqlUserService";
import { Connection } from "mysql2/promise";
import { User } from "./models/User";
import { BcryptJsEncrypter } from "./encrypter/BcryptJsEncrypter";
import { JwtDataDecorator } from "./decorators/JwtDataDecorator";
import { UserAppController } from "./controllers/UserAppController";

class Server {
    public static async start(): Promise<void> {
        Config.load();
        const port: number = Config.get('PORT') as number;
        const host: string = Config.get('HOST') as string;
        const db: MysqlDatabase = new MysqlDatabase();
        const passwordEncrypter: BcryptJsEncrypter = new BcryptJsEncrypter();
        const jwtTokenHandler: JwtTokenHandler = new JwtTokenHandler();
        const userService: MysqlUserService<JwtPayload> = new MysqlUserService<JwtPayload>(db, passwordEncrypter, jwtTokenHandler);

        const serverDependencies: ServerDependencies<JwtPayload, Connection, User> = {
            validator: Server._getValidator(),
            tokenHandler: jwtTokenHandler,
            errorHandler: new ServerErrorHandler(),
            authController: new AuthAppController<JwtPayload, Connection, User>(userService),
            userController: new UserAppController<JwtPayload, Connection, User>(userService),
            decorator: new JwtDataDecorator()
        };

        try {
            await db.connect();

            /**
             * Use the following line to create multiple users in the database.
             * When start the server for the first time, uncomment the following lines,
             * then make sure to comment them if restart the server.
             */
            // await userService.create({ username: "adrian", password: "password", email: "adrian@gmail.com", first_name: "Adrian", last_name: "Stefan", latitude: 44.4268, longitude: 26.1025 });
            // await userService.create({ username: "daniel", password: "password", email: "daniel@gmail.com", first_name: "Daniel", last_name: "Munteanu" });

            await new ServerApp<JwtPayload, Connection, User>(serverDependencies).start(port, host);
        } catch (err: unknown) {
            console.error('Server failed to start :: ', err);
            await db.disconnect();
            process.exit(1);
        }
    }

    private static _getValidator(): Validator {
        const validator: AjvValidator = new AjvValidator();
        validator.addSchema(LoginSchema, ValidationSchema.LOGIN);
        validator.addSchema(AuthorizationSchema, ValidationSchema.AUTHORIZATION);

        return validator;
    }
};

Server.start();
