const { ValidateSignature } = require("../../utils");
const { AuthorizeError } = require("../../utils/errors/app-errors");

module.exports = async (req, res, next) => {
    try {
        const isAuthorized = await ValidateSignature(req);
        if (isAuthorized) {
            return next();
        }

        throw new AuthorizeError("not authorised to access resources");
    } catch (error) {
        next(error);
    }
};
