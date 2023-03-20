import express from 'express';
import { dirname } from './../index.js';
import path from 'path'

const router=express.Router();

router.get('/subscribe',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/subscribe.html'))
})


export { router as subscribeHomepage}