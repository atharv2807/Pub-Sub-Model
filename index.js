import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

import {DB} from './server.js'
import { registerEmail } from './controllers/subscribe.js';
import { writeMessageIntoDB } from './controllers/publish.js';
import { sendTheMails } from './controllers/publish.js';
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
    console.log(name);
    const message=req.body.inputMessage;
    writeMessageIntoDB(name,message)
    sendTheMails(message);
    res.send("Success!!!!");
})
app.post('/textSearch',async (req,res)=>{
    const dataToSearch=req.body.textToSearch;
    const responseFromSearch=await DB.query('SELECT * FROM MessageList WHERE message LIKE '+"'"+dataToSearch+'%'+"'");
    res.send(responseFromSearch.rows);
})


export default app;