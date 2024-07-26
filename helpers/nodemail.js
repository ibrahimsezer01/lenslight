const nodemailer = require("nodemailer");
const config = require("../config");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: config.email.username,
        pass: config.email.password,
    },
});


exports.send_email = async (send_to, subject, text) => {

    const sendMail = {
        from: { name: config.email.username },
        to: send_to,
        subject: subject,
        text: text
    };

    try {
        const mail = await transporter.sendMail(sendMail); // Fonksiyonu bekliyoruz
        console.log(mail ? "Mail gönderildi" : "Mail gönderilemedi");
    } catch (error) {
        console.log("Mail gönderirken hata oluştu:", error);
    }
}


exports.get_email = async (from, subject, text) => {
    const getMail = {
        from: from,
        to: config.email.to,
        subject: subject,
        text: text
    };

    try {
        const mail = await transporter.sendMail(getMail); // Fonksiyonu bekliyoruz
        console.log(mail ? "Mail geldi" : "Mail gelmedi");
    } catch (error) {
        console.log("Mail gelirken hata oluştu:", error);
    }
}