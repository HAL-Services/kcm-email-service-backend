const express = require('express')
const router = new express.Router()
const nodemailer = require('nodemailer')
require("dotenv").config()


router.post("/api/quote/", (req, res) => {
    const { name, email, mobile, carModel, year, type } = req.body
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
            html: `<h1>Quote Request</h1><h3>Name:${name}</h3><h3>Mobile:${mobile}</h3><h3>Email:${email}</h3><h3>Car Model:${carModel}</h3><h3>Manufacturing Year:${year}</h3><h3>Engine Type:${type}</h3>`
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

            }
            else {
                res.status(201).json({ status: 201, info })
            }
        })
    } catch (error) {
        res.status(401).json({ status: 401, error })
    }
})
module.exports = router