const Photo = require("../models/Photo")
const User = require("../models/User");


// get users page
exports.get_users = async (req, res) => {
    const id = res.locals.user._id

    try {
        const users = await User.find({ _id: { $ne: id } })
        return res.render("users", {
            page_name: "users",
            users: users
        })
    } catch (error) {
        console.log(error);
    }
}

// get user by id
exports.get_user_ById = async (req, res) => {
    const userId = req.params.id

    try {
        const user = await User.findById(userId)

        const inFollowers = user.followers.some((follower) => {
            return follower.equals(res.locals.user._id)
        })

        const photos = await Photo.find({ user: user._id })
        return res.render("user", {
            page_name: "users",
            user: user,
            photos: photos,
            inFollowers: inFollowers
        })
    } catch (error) {
        console.log(error);
    }
}

// follow
exports.post_follow = async (req, res) => {
    const followerId = res.locals.user._id
    const followedId = req.params.id

    try {
        let user = await User.findByIdAndUpdate(
            { _id: followedId },
            { $push: { followers: followerId } },
            { new: true }
        )

        user = await User.findByIdAndUpdate(
            { _id: followerId },
            { $push: { followings: followedId } },
            { new: true }
        )

        res.status(200).redirect(`/user/${followedId}`)

    } catch (error) {
        console.log(error);
    }
}

// unfollow
exports.post_unfollow = async (req, res) => {
    const id = req.params.id

    try {
        let user = await User.findByIdAndUpdate(
            { _id: id },
            { $pull: { followers: id } },
            { new: true }
        )

        user = await User.findByIdAndUpdate(
            { _id: id },
            { $pull: { followings: id } },
            { new: true }
        )

        res.status(200).redirect(`/user/${followedId}`)

    } catch (error) {
        console.log(error);
    }
}