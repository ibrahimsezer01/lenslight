const express = require("express")
const router = express.Router()
const photos = require("../controllers/photos")
const authControl = require("../middlewares/auth-control")


router.get("/photos", authControl, photos.get_photos)

router.post("/photos", authControl, photos.post_photos)

router.get("/photo/:id", authControl, photos.get_photo_ById)

router.delete("/photo/delete/:id", authControl, photos.delete_photo_ById)

router.put("/photo/update/:id", authControl, photos.update_photo_ById)

module.exports = router