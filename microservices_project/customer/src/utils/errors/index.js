const Sentry = require("@sentry/node");
const _ = require("@sentry/tracing");
const {
    NotFoundError,
    ValidationError,
    AuthenticationError,
    AuthorizationError,
    BaseError,
} = require("./app-errors");

Sentry.init({
    dsn: "YOUR_SENTRY_DNS_KEY_FROM_INTEGRATION_PAGE",
    tracesSampleRate: 1.0,
});

module.exports = (app) => {
    app.use((error, req, res, next) => {
        let reportError = true;

        // Skip common / known errors
        [NotFoundError, ValidationError, AuthenticationError, AuthorizationError].forEach((typeOfError) => {
            if (error instanceof typeOfError) {
                reportError = false;
            }
        });

        // Report unknown errors to Sentry
        if (reportError) {
            Sentry.captureException(error);
        }

        const statusCode = error.statusCode || 500;

        if (error instanceof BaseError) {
            return res.status(statusCode).json(error.toJSON());
        }

        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            statusCode: 500,
            code: "INTERNAL_ERROR",
        });
    });
};
