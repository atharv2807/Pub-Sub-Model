import express from 'express';
import { dirname } from './../index.js'; 
import path from 'path'
const router=express.Router();

router.post('/feedback',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/success.html'))
})

export { router as postFeedback}