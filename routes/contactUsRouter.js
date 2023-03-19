const express = require('express')
const router = new express.Router()
const nodemailer = require('nodemailer')
require("dotenv").config()


router.post("/api/contact/", (req, res) => {
    const { name, email, query, message } = req.body
    try {
        const transporter = nodemailer.createTransport(
            {
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD

                }
            }
        )
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "SENDING EMAIL WITH REACT AND ",
            html: `<h1>Contact Us</h1><h2>${query}</h1><h3>Name:${name}</h3><h3>Email:${email}</h3><p>${message}</p>`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error", error);
            }
            else {
                console.log("Email sent", info.response)
                res.status(201).json({ status: 201, info })
            }
        })
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})
module.exports = router