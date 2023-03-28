import express from 'express';
import { dirname } from './../index.js';
import path from 'path'

const router=express.Router();

router.get('/loginSuccess',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/success.html'));
})

export { router as authSuccess}