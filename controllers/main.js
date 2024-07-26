const config = require("../config");
const nodemail = require("../helpers/nodemail");
const User = require("../models/User");


// get home page
exports.get_home = (req, res) => {
    try {
        return res.render("home", {
            page_name: "home"
        })
    } catch (error) {
        console.log(error);
    }
}

// get about page
exports.get_about = (req, res) => {
    try {
        return res.render("about", {
            page_name: "about"
        })
    } catch (error) {
        console.log(error);
    }
}

// get contact page
exports.get_contact = (req, res) => {
    try {
        return res.render("contact", {
            page_name: "contact"
        })
    } catch (error) {
        console.log(error);
    }
}

// post contact
exports.post_contact = async (req, res) => {
    const email = res.locals.user.email
    const { header, message } = req.body

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            await nodemail.get_email(email, header, message)

            res.status(200).json({ succeded: true })
        } else {
            res.clearCookie('jsonwebtoken');
            return res.redirect("/login")
        }

    } catch (error) {
        console.log(error);
    }
}