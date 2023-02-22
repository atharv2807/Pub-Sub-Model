import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

import {DB} from './server.js'
import { registerEmail } from './controllers/subscribe.js';


const app=express();

// To configure the .env file
dotenv.config();

// To set-up the  __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'))

// To render HTML files
app.set('view engine', 'ejs')

// For parsing the request body
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())

// Routes
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/starter.html'));
})
app.get('/subscribe',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/subscribe.html'))
})
app.get('/publish',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/publish.html'))
})
app.get('/textSearch',(req,res)=>{
    res.sendFile(path.join(__dirname+'/public/textSearch.html'))
})
app.post('/subscribe',async (req,res)=>{
    const {name,email}=req.body;
    await registerEmail(name,email);
    res.end("Response Recieved")

})
app.post('/publish',async (req,res)=>{
    const name=req.body.name;
    const message=req.body.inputMessage;
    const query={
        text:'INSERT INTO MessageList VALUES($1, $2)',
        values:[name,message]
    }
    const responseFromMessageSave=await DB.query(query);
    sendTheMails(message);
    res.send("Success!!!!");
})
app.post('/textSearch',async (req,res)=>{
    const dataToSearch=req.body.textToSearch;
    const responseFromSearch=await DB.query('SELECT * FROM MessageList WHERE message LIKE '+"'"+dataToSearch+'%'+"'");
    res.send(responseFromSearch.rows);
})
async function sendTheMails(mailMessage){
    let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USERNAME_ID,
        pass:process.env.MAIL_PASSWORD
    }
})
    let mailList;
    const res=await DB.query('SELECT email FROM MailList')
    mailList=res.rows;
    let listOfMails=[];
    mailList.forEach((e)=>{
        listOfMails.push(e['email'])
    })
    let details={
        from:"agoel@deqode.com",
        to: listOfMails,
        subject:"Broadcast Message",
        text:mailMessage
    }
    transporter.sendMail(details,(err)=>{
        if(err){
            console.log("Error",err)
        }else{
            console.log("Mail sent successfully");
        }
    })

}

export default app;