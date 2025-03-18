const express = require("express");
const app = express();
const { UserModel } = require("./db")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const users = []
const JWT_SECRET = "ILOVEMERN"
const cors = require("cors")
mongoose.connect(
    ""
)

app.use(cors())

app.use(express.json());

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    let errorthrown = false;
    try {
        const HashedPassword = await bcrypt.hash(password, 4);

        await UserModel.create({
            email: email,
            name: name,
            password: HashedPassword
        })
    } catch (e) {
        errorthrown = true;
        res.json({
            messege:"Email Already Exists"
        })
   }

    if (!errorthrown) {
        res.json({
            messege: "SucessFully Signed Up"
        });
    }

});

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    })

    if (!user) {
        res.json({
            messege: "User not found"
        })
    }

    const passMatch = await bcrypt.compare(password, user.password)

    if (passMatch) {
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        res.json({
            token: token,
            password:user.password
        });
    } else {
        res.status(403).json({
            messege: "Incorrect Credentials",
        });
    }
});

app.listen(3000);
