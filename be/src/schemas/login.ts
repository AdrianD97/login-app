import { ValidationSchema } from "../core/types";
import { Utility } from "../utils/Utility";

export const LoginSchema = {
    $id: ValidationSchema.LOGIN,
    type: 'object',
    properties: {
        username: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
    },
    required: ['username', 'password'],
    additionalProperties: false,
    errorMessage: {
        required: {
            username: Utility.createMissingRequiredFieldError('Username'),
            password: Utility.createMissingRequiredFieldError('Password')
        },
        properties: {
            username: Utility.createInvalidFieldTypeError('Username', 'string'),
            password: Utility.createInvalidFieldTypeError('Password', 'string')
        }
    }
};
