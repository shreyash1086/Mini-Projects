const jwt = require("jsonwebtoken")
const {USERS_SECRET} = require("../config")

function userMiddleware(req, res, next) {
    const token = req.headers.token;
    const decodeToken = jwt.verify(token, USERS_SECRET)
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
    userMiddleware : userMiddleware
}