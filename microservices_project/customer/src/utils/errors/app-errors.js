const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

class BaseError extends Error {
    constructor(name, statusCode, code, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.code = code;
        this.description = description;
        Error.captureStackTrace(this);
    }

    toJSON() {
        return {
            status: "error",
            message: this.description,
            statusCode: this.statusCode,
            code: this.code
        };
    }
}

// 500 Internal Error
class APIError extends BaseError {
    constructor(description = "api error", code = "INTERNAL_ERROR") {
        super(
            "api internal server error",
            STATUS_CODES.INTERNAL_ERROR,
            code,
            description
        );
    }
}

// 400 Validation Error
class ValidationError extends BaseError {
    constructor(description = "bad request", code = "VALIDATION_ERROR") {
        super("bad request", STATUS_CODES.BAD_REQUEST, code, description);
    }
}

// 401 Authentication error
class AuthenticationError extends BaseError {
    constructor(description = "authentication failed", code = "AUTHENTICATION_ERROR") {
        super("authentication failed", STATUS_CODES.UNAUTHORIZED, code, description);
    }
}

// 403 Authorize error
class AuthorizationError extends BaseError {
    constructor(description = "access denied", code = "FORBIDDEN") {
        super("access denied", STATUS_CODES.FORBIDDEN, code, description);
    }
}

// 404 Not Found
class NotFoundError extends BaseError {
    constructor(description = "not found", code = "NOT_FOUND") {
        super("not found", STATUS_CODES.NOT_FOUND, code, description);
    }
}

module.exports = {
    APIError,
    ValidationError,
    AuthorizationError,
    AuthenticationError,
    NotFoundError,
    BaseError,
};
