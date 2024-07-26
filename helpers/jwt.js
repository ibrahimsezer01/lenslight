const jwt = require("jsonwebtoken")

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h", algorithm: "HS256" })
}

module.exports = createToken;