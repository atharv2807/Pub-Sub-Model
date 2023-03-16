import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import {fileURLToPath} from 'url';

import { registerEmail } from './controllers/subscribe.js';
import { writeMessageIntoDB } from './controllers/publish.js';
import { sendTheMails } from './controllers/publish.js';
import {textSearchInDB} from './controllers/textSearch.js'
import { unsubscribeUser } from './controllers/unsubscribe.js'

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
    res.sendFile(path.join(__dirname,'/public/subscribe.html'))
})

app.get('/publish',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/publish.html'))
})

app.get('/textSearch',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/textSearch.html'))
})

app.get('/unsubscribe',(req,res)=>{
    res.sendFile(path.join(__dirname,'/public/unsubscribe.html'))
})

app.post('/subscribe',async (req,res)=>{
    const {name,email}=req.body;
    const response=await registerEmail(name,email);
    if(response==='Successful'){
        res.sendFile(path.join(__dirname,'/public/success.html'))
    }else{
        res.send(response)
    }

})

app.post('/publish',async (req,res)=>{
    const {name,subject,inputMessage}=req.body;
    console.log(name);
    let response=await writeMessageIntoDB(name,inputMessage)
    if(response==='Successful'){
        response = await sendTheMails(subject,inputMessage);
    }
    if(response==='Successful'){
        res.sendFile(path.join(__dirname,'/public/success.html'))
    }
})

app.post('/textSearch',async (req,res)=>{
    const dataToSearch=req.body.textToSearch;
    const response=await textSearchInDB(dataToSearch);
    res.send(response.rows);
})

app.post('/unsubscribe',async (req,res)=>{
    const {email}=req.body;
    const response=await unsubscribeUser(email)
    if(response==='Successful'){
        res.sendFile(path.join(__dirname,'/public/success.html'))
    }

})

export default app;