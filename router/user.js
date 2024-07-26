const express = require("express")
const router = express.Router()
const user = require("../controllers/user")
const authControl = require("../middlewares/auth-control")


router.get("/users", authControl, user.get_users)

router.get("/user/:id", authControl, user.get_user_ById)

router.put("/user/:id/follow", authControl, user.post_follow)

router.put("/user/:id/unfollow", authControl, user.post_unfollow)

module.exports = router