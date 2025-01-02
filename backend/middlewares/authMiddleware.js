import jwt from 'jsonwebtoken'

export const authMiddleware = async(req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    try {
        
        if (!token) {
            return res.status(403).json({message: 'You are not authorized'})
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({message: err.message})
            }

            req.user = {
                id: decoded.id,
                email: decoded.email,
                role: decoded.role
            }

            next();
        })


    } catch (error) {
        res.status(500).json({message: error.message})
    }

}