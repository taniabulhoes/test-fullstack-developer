
type ErrorResponseObject = {
    message: string;
    status: number
};

export enum ErrorTypes {
    NotFound = 'NotFound',
    NameRequired = 'NameRequired',
    EmailRequired = 'EmailRequired',
    TitleRequired = 'TitleRequired',
    DescriptionRequired = 'DescriptionRequired',
    PasswordRequired = 'PasswordRequired',
    EmptyRequest = 'EmptyRequest',
    UnauthorizedError = 'Unauthorized',
    MissingHeader = "MissingHeader",
    tokenNotFound = 'TokenNotFound',
    TokenExpiredError = 'jwt expired',
    JsonWebTokenError = 'jwt malformed',
    DuplicateEmail = 'DuplicateEmail'
}

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>


export const errorCatalog: ErrorCatalog = {
    NotFound: {
        message: 'Not Found',
        status: 400,
    },
    EmailRequired: {
        message: 'Email Required',
        status: 400,
    },
    PasswordRequired: {
        message: 'Password Required',
        status: 400,
    },
    NameRequired: {
        message: 'Name Required',
        status: 400,
    },
    TitleRequired: {
        message: 'Title Required',
        status: 400,
    },
    DescriptionRequired: {
        message: 'Description Required',
        status: 400,
    },
    EmptyRequest: {
        message: 'Empty Request',
        status: 204,
    },
    Unauthorized: {
        message: 'Invalid email or password',
        status: 400,
    },
    TokenNotFound: {
        message: 'Token not found',
        status: 401,
    },
    MissingHeader: {
        message: 'Missing Authorization Header',
        status: 400,
    },
    'jwt expired': {
        message: 'Jwt has Expired',
        status: 401,
    },
    'jwt malformed': {
        message: 'Jwt malformed',
        status: 401,
    },
    DuplicateEmail: {
        message: "Email already registered",
        status: 400,
    }
};