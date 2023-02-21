import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
const app=express();
dotenv.config();


let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USERNAMEID,
        pass:process.env.PASSWORD
    }
})
let mailList=["goel.atharv111@gmail.com","atharv.goel111@gmail.com"]

let details={
    from:"agoel@deqode.com",
    to:mailList,
    subject:"Testing my nodemailer",
    text:"Congratulations you are our first member"
}
transporter.sendMail(details,(err)=>{
    if(err){
        console.log("Error",err)
    }else{
        console.log("Mail sent successfully");
    }
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is up and running at port ${process.env.PORT}`)
})
