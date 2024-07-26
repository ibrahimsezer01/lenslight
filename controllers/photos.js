const Photo = require("../models/Photo")
const User = require("../models/User");
const cloudinary = require("../helpers/cloudinary")
const fs = require("fs")


// get photos page
exports.get_photos = async (req, res) => {
    const id = res.locals.user._id

    try {
        const photos = await Photo.find({ user: { $ne: id } }).sort({ uploadedAt: -1 }).limit(30)
        return res.render("photos", {
            photos: photos,
            page_name: "photos"
        })
    } catch (error) {
        console.log(error);
    }
}

// post a new photos
exports.post_photos = async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const image = req.files.image.tempFilePath

    try {
        const result = await cloudinary.handleUpload(image)

        await Photo.create({
            name: name,
            url: result.secure_url,
            description: description,
            user: res.locals.user._id,
            image_id: result.public_id
        });

        fs.unlinkSync(image)

        return res.status(201).redirect("/dashboard");

    } catch (error) {
        console.log("Fotoğraf yüklenirken bir hata oluştu:", error);
        res.status(500).json({ error: "Fotoğraf yüklenirken bir hata oluştu." });
    }
}

// get photo by id
exports.get_photo_ById = async (req, res) => {
    const photoId = req.params.id
    let isOwner = false

    try {
        const photo = await Photo.findById({ _id: photoId }).populate("user")

        if (res.locals.user) {
            isOwner = photo.user.equals(res.locals.user._id)
        }

        return res.render("photo", {
            photo: photo,
            page_name: "photos",
            isOwner: isOwner
        })
    } catch (error) {
        console.log(error);
    }
}

// delete photo by id
exports.delete_photo_ById = async (req, res) => {
    const id = req.params.id

    try {
        const photo = await Photo.findById({ _id: id })
        await cloudinary.handleDelete(photo.image_id)
        await Photo.findByIdAndDelete({ _id: id })

        return res.status(200).redirect("/users/dashboard")

    } catch (error) {
        console.log(error);
    }
}

// update photo by id
exports.update_photo_ById = async (req, res) => {
    const { name, description } = req.body
    const id = req.params.id
    const files = req.files

    try {
        const photo = await Photo.findById({ _id: id })

        if (files) {
            const image = req.files.image.tempFilePath
            const photoId = photo.image_id

            await cloudinary.handleDelete(photoId)
            const newImage = await cloudinary.handleUpload(image)

            photo.url = newImage.url
            photo.image_id = newImage.public_id

            fs.unlinkSync(image)

        } else {
            photo.name = name
            photo.description = description
        }
        
        photo.save()
        return res.status(200).redirect(`/dashboard`)


    } catch (error) {
        console.log(error);
    }
}