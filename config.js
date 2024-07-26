const config = {
    db: {
        host: process.env.MONGO_HOST,
        database: process.env.MONGO_DB_NAME
    },
    email: {
        username: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        port: process.env.EMAIL_PORT
    }
}

module.exports = config