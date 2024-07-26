// dotenv
const dotenv = require("dotenv")
dotenv.config()

// express
const express = require('express')
const app = express()

// node modules
const cookieParser = require("cookie-parser")
const session = require("express-session")
const fileUpload = require("express-fileupload")
const methodOverride = require("method-override")

// custom modules
const checkUser = require("./middlewares/check-user")


// connection to db
const connect = require("./data/db")
connect()

// engine
app.set("view engine", "ejs")

// static files
app.use(express.static("public"))

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(fileUpload({ useTempFiles: true }))
app.use(methodOverride("_method", {methods: ["POST", "GET"]} ))
app.use("*", checkUser)


// router
const main = require("./router/main")
const auth = require("./router/auth")
const user = require("./router/user")
const photos = require("./router/photos")
app.use(user)
app.use(auth)
app.use(main)
app.use(photos)

const port = process.env.PORT || 3579
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))