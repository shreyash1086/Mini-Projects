const { Router } = require("express")
const { adminModel } = require("../db")
const adminRouter = Router();
const jwt = require("jsonwebtoken")
const { z } = require("zod")
const bcrypt = require("bcrypt");
const { ADMIN_SECRET } = require("../config");
const { adminMiddleware } = require("../middlewares/admin");
const { courseModel } = require("../db")

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

adminRouter.post("/course",adminMiddleware, async (req, res) => {
    //to upload a new course
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;

    try {
        const course = await courseModel.create({
            title, description, imageUrl, price, creatorId: adminId
        })

        res.json({
            messege: "Successfuly Uploded the Course",
            courseId: course._id
        })
    } catch (err) {
        res.json({
            messege: "Failed to generate course"
        })
    }

})

adminRouter.put("/course",adminMiddleware, async (req, res) => {
    //to update the current course
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId // while updating the data from the database we should consider which course to update and who is the ownwe of that course
    },{
        title, description, imageUrl, price
    })

    res.json({
        messege: "course is updated",
        courseId: course._id
    })
    
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const adminId = req.userId
    const courses = await courseModel.find({
        creatorId: adminId
    })

    res.json({
        messege: "Here are all the courses",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}