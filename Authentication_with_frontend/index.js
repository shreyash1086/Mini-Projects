const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const JWTSEC = "who knows shreyash better than himself"
const { UserModel } = require("./db")
const path = require("path");

mongoose.connect("mongodb+srv://shreyashdamodar1086:Hgwlbuv3g9NXWCbp@cluster0.av25l.mongodb.net/Lalatric")

app.use(express.json())

app.use(express.static(path.join(__dirname,"public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/signup", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const name = req.body.name

    try {
        const hashedPassword = await bcrypt.hash(password, 4)

        await UserModel.create({
            username: username,
            password: hashedPassword,
            name: name
        })
        res.json({
            messege: "you are signed up successfully"
        })
    } catch (error) {
        res.json({
            messege : "User already Exist"
        })
    }

})

app.post("/signin", async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await UserModel.findOne({
            username: username
        })

        if (!user) {
            return res.json({
                messege:"invalid credentials"
            })
        }

        const passMatch = await bcrypt.compare(password, user.password)

        if (passMatch) {
            const token = jwt.sign({ id: user._id.toString() }, JWTSEC)

            res.json({
                token: token
            })
        } 
    } catch (err) {
        res.json({
            messege: "Invalid Credentials"
        })
        console.log("Invalid credentials")
    }
    
})

function auth(req, res, next) {
    const token = req.headers.token;

    try {
        const decodeToken = jwt.verify(token, JWTSEC)
        req._id = decodeToken.id
        next()
    } catch (err) {
        res.json({
            messege: "Invalid token"
        })
    }
}

app.get("/me", auth, async (req, res) => {
    const userId = req._id;
    const user = await UserModel.findOne({
        _id : userId
    })

    if (user) {
        res.json({
            username: user.username,
            password: user.password,
            name: user.name
        })
    }
})

app.listen(3000)