import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    id: number;
    username: string;
    password: string;
    email: string;
    first_name: string;
    last_name: string;
    latitude: number;
    longitude: number;
    created_at: Date;
};
