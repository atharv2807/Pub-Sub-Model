import express from 'express';
import { registerEmail } from '../controllers/subscribe.js';
import path from 'path'
const router=express.Router();



router.post('/subscribe',async (req,res)=>{
    const {name,email}=req.body;
    const response=await registerEmail(name,email);
    if(response==='Successful'){
        res.sendFile(path.join(__dirname,'/public/success.html'))
    }else{
        res.send(response)
    }

})

export { router as subscribeAPI}