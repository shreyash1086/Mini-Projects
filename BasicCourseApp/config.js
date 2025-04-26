require("dotenv").config()

const USERS_SECRET = process.env.USERS_SECRET
const ADMIN_SECRET = process.env.ADMIN_SECRET

module.exports = {
    USERS_SECRET,
    ADMIN_SECRET
}