const User = require("../models/User");
const Photo = require("../models/Photo");
const bcrypt = require("bcrypt")
const message = require("../helpers/message")
const nodemail = require("../helpers/nodemail")
const createToken = require("../helpers/jwt");
const slugfield = require("../helpers/slugfield");


// Log in
exports.get_login = (req, res) => {
    try {
        return res.render("login", {
            page_name: "login"
        });
    } catch (error) {
        console.log(error);
    }
}

exports.post_login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.redirect("/");
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.redirect("/")
        }

        if (user && match) {
            const token = createToken(user._id)
            res.cookie("jsonwebtoken", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            return res.redirect("/dashboard")
        }

    } catch (error) {
        console.log(error);
    }
}

// Register
exports.get_register = (req, res) => {
    try {
        return res.render("register", {
            page_name: "register"
        });
    } catch (error) {
        console.log(error);
    }
}

exports.post_register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password,
            url: slugfield(username)
        });

        if (user) {
            const token = createToken(user._id);
            res.cookie("jsonwebtoken", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            });

            const text = `Merhabalar ${user.username}, LensLight Uygulamasına Hoş Geldiniz. Burada dilediğiniz gibi diğer kullanıcılar ile fotoğraflarınızı paylaşabilir ve herkesin paylaşmış olduğu fotoğrafları görüntüleyebilirsiniz`;
            await nodemail.send_email(user.email, "LensLight'a Hoşgeldiniz " + user.username, text);

            return res.status(201).json({ user: user.id })
        }

    } catch (error) {
        console.log('ERROR', error);

        let errors2 = {};

        if (error.code === 11000) {
            errors2.email = 'The Email is already registered';
        }

        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;
            });
        }

        res.status(400).json(errors2);
    }
};

// DashBoard
exports.get_dashboard = async (req, res) => {
    const id = res.locals.user._id

    try {
        const photos = await Photo.find({ user: id });
        const user = await User.findById({ _id: id }).populate(["followings", "followers"])

        return res.render("dashboard", {
            page_name: "dashboard",
            photos: photos,
            user: user
        });
    } catch (error) {
        console.log(error);
    }
}

// Log out
exports.get_logout = (req, res) => {
    try {
        res.clearCookie('jsonwebtoken');
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
}