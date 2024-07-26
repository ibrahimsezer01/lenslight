const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: [validator.isAlphanumeric, "Onlu Alphanumeric character"]
    },
    url: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email area is required"],
        unique: true,
        validate: [validator.isEmail, "Valid email is required"]
    },
    password: {
        type: String,
        required: [true,, "Password area is required"],
        minLength: [6, "At least 6 character"]
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    const user = this
    console.log(user.password);
    try {
        // Şifreyi hashleme işlemini gerçekleştirin ve şifreyi güncelleyin
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(err)
    }
})


const User = mongoose.model("User", userSchema)

module.exports = User