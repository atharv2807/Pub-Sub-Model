import express from 'express';
import { dirname } from './../index.js';
import path from 'path'

const router=express.Router();

router.get('/unsubscribe',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/unsubscribe.html'))
})



export { router as getUnsubscribePage}