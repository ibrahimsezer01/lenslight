const express = require("express")
const router = express.Router()
const main = require("../controllers/main")
const authControl = require("../middlewares/auth-control")


router.get("/about", authControl, main.get_about)

router.get("/contact", authControl, main.get_contact)

router.post("/contact", authControl, main.post_contact)

router.get("/", authControl, main.get_home)

module.exports = router