import express from 'express';
import { dirname } from './../index.js';
import path from 'path'

const router=express.Router();

router.get('/publish',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/publish.html'))
})


export { router as getPublishPage}