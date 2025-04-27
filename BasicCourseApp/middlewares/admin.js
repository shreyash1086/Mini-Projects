const jwt = require("jsonwebtoken")
const {ADMIN_SECRET} = require("../config")

function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodeToken = jwt.verify(token, ADMIN_SECRET)

    if (decodeToken) {
        req.userId = decodeToken.id
        next()
    } else {
        res.status(403).json({
            messege : "you are not signed in"
        })
    }
}

module.exports = {
    adminMiddleware : adminMiddleware
}