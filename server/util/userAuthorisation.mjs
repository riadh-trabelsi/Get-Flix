import responseHandler from './handlers/responseHandlers.mjs';

const userAuthorisation = (auhtorizedRole) => (req, res, next) => {
    const userRoles = req.user.roles;

    if (userRoles.includes(auhtorizedRole)) {
        next();
    } else {
        responseHandler.forbidden(res);
    }
};

export default userAuthorisation;