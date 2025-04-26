const { Router } = require("express")
const { adminModel } = require("../db")
const adminRouter = Router();
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const bcrypt = require("bcrypt");
const { ADMIN_SECRET } = require("../config");

adminRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        firstName: z.string().min(3).max(10),
        lastName: z.string().min(3).max(10),
        email: z.string().min(5).max(50).email(),
        password: z.string().min(6).max(50)
    })

    const parsedData = requiredBody.safeParse(req.body)

    if (!parsedData.success) {
        res.status(403).json({
            messege: "Invalid Input",
            error: parsedData.error
        })
        return
    }

    const { firstName, lastName, email, password } = req.body;

    let errorfound = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 4);

        await adminModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        })

    } catch (err) {
        res.status(403).json({
            messege: "Error inserting data into the database"
        })
        errorfound = true
    }

    if (!errorfound) {
        res.json({
            messege: "You successfully signed Up"
        })
    }
})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const user = await adminModel.findOne({
        email: email
    })

    if (!user) {
        res.status(403).json({
            messege: "User not found"
        })
    }

    const matchedpassword = await bcrypt.compare(password, user.password)

    if (matchedpassword) {
        const token = jwt.sign({
            id: user._id
        }, ADMIN_SECRET)

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            messege: "Invalid password"
        })
    }

})

adminRouter.post("/course", async (req, res) => {
    //to upload a new course
})

adminRouter.put("/course", async (req, res) => {
    //to update the current course
})

module.exports = {
    adminRouter: adminRouter
}