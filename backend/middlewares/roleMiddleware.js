
export const roleAuthorize = (...allowedRoles) => {
    return async(req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({message: 'Access Denied'})
        }
        next()
    }
}