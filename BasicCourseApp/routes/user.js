const { Router } = require("express");
const { userModel } = require("../db");
const userRouter = Router();
const bcrypt = require("bcrypt")
const { USER_SECRET } = require("../config")
const jwt = require("jsonwebtoken")

userRouter.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    let errorthrown = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await userRouter.create({
            firstName: firstName,
            lastNmae: lastName,
            email: email,
            password: hashedPassword
        })
    } catch (err) {
        res.json({
            messege: "Email already exists"
        })
        errorthown = true;
    }

    if (!errorthrown) {
        res.json({
            messege: "You have successfully signed Up"
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = userModel.findOne({
        email: email
    })

    if (!user) {
        res.status(403).json({
            messege : "User not found"
        })
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
        const token = jwt.sign({
            id: user._id
        }, USER_SECRET)

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            messege : "Invalid Password"
        })
    }
})

userRouter.get("/purchases", async (req, res) => {

})

module.exports = {
    userRouter: userRouter
}