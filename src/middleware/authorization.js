
const protectRoute = (role) => (req, res, next) => {
    const user = req.user;

    /* User posses same role */
    if (user.role !== role) {
        return res.status(403).json({
            status: 403,
            message: 'Access Forbidden'
        })
    }

    /* user posses same role */
    next();
}

module.exports = protectRoute;