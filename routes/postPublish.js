import express from 'express';
import { writeMessageIntoDB } from '../controllers/publish.js';
import { sendTheMails } from '../controllers/publish.js';
import path from 'path'
import { dirname } from '../index.js';
const router=express.Router();

router.post('/publish',async (req,res)=>{
    const {name,subject,inputMessage}=req.body;
    console.log(name);
    let response=await writeMessageIntoDB(name,inputMessage)
    if(response==='Successful'){
        response = await sendTheMails(subject,inputMessage);
    }
    if(response==='Successful'){
        res.sendFile(path.join(dirname,'/public/success.html'))
    }
})

export {router as postPublishMessage}