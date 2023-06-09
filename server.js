const express=require('express')
const app=express()
const cors=require('cors')
require("dotenv").config()
const router=require('./routes/getQuoteRouter')
const contactUsRouter=require('./routes/contactUsRouter')
app.use(express.json())
app.use(cors())



app.use(router)
app.use(contactUsRouter)


app.listen(process.env.PORT,()=>{
    console.log("Seriver is up and running")
})