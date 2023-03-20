import express from 'express';
import { dirname } from './../index.js';
import path from 'path'

const router=express.Router();

router.get('/',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/starter.html'));
})

export { router as starterPage}