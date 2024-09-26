const { ValidateSignature } = require("../../utils");
const { AuthenticationError } = require("../../utils/errors/app-errors");

module.exports = async (req, res, next) => {
    try {
        const isAuthorized = await ValidateSignature(req);
        if (isAuthorized) {
            return next();
        }

        throw new AuthenticationError("not authorised to access resources");
    } catch (error) {
        next(error);
    }
};
