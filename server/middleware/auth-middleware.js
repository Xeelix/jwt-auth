import ApiError from "../exeptions/api-error.js";
import tokenService from "../service/token-service.js";

export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnathorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.UnathorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnathorizedError());
        }

        req.user = userData;
        next();
    } catch (error) {
        return next(ApiError.UnathorizedError());
    }
}