// types and interfaces
export interface ValidatorResult {
    valid: boolean;
    error?: string;
};

// enum
export enum STATUS_CODE {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    WRONG_CREDENTIALS = 401,
    UNAUTHORIZED = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501
};

export enum MESSAGE {
    SERVER_ERROR = 'server error',
    NOT_FOUND = 'resource not found',
    INVALID_CREDENTIALS = 'invalid credentials',
    UNAUTHORIZED = 'unauthorized',
    INVALID_DATA = 'invalid data',
    INVALID_AUTH_TOKEN = 'invalid auth token',
    NOT_IMPLEMENTED = 'not implemented',
    DELETED = 'resource deleted'
};

export enum ValidationSchema {
    LOGIN = 'login',
    AUTHORIZATION = 'authorization'
};
