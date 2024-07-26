const jwt = require("jsonwebtoken");

const authControl = async (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) {
                    console.log(err);
                    return res.redirect("/login");
                } else {
                   next();
                }
            });
        } else {
            return res.redirect("/login");
        }

    } catch (error) {
        res.status(401).json({
            succeeded: false,
            error: "Not Authenticated"
        });
    }
};

module.exports = authControl;