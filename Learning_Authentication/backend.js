const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")

const users = []
const SECRET = "Who know who is shreyash"

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html")
})
app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password : password
    })

    res.json({
        messege: "Successfully signed up"
    })
})

app.post("/signin", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    let founduser = null;
    for (let i = 0; i < users.length; i++){
        if (users[i].username == username && users[i].password == password) {
            founduser = users[i];
            console.log(founduser)
        }
    }

    if (founduser) {
        const token = jwt.sign({ username: username }, SECRET);
        res.json({
            token : token
        })
    } else {
        res.json({
            messege: "invalid credentials"
        })
    }
})

function auth(req, res, next) {
    const token = req.headers.token;
    const decodetoken = jwt.verify(token, SECRET);

    if (decodetoken.username) {
        req.username = decodetoken.username;
        next()
    } else {
        res.json({
            messege : "invalid token or you are not logged in"
        })
    }
}

app.get("/me", auth, (req, res) => {
    let founduser = null;
    for (let i = 0; i < users.length; i++){
        if (req.username === users[i].username) {
            founduser = users[i]
        }
    }
    
    if (founduser) {
        res.json({
            username: founduser.username,
            password: founduser.password,
            messege : "you have sent token successfully"
        })
    }
})

app.listen(3000)