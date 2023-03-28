import express from 'express';
import { unsubscribeUser } from '../controllers/unsubscribe.js';
import path from 'path'
import { dirname } from '../index.js';
const router = express.Router();

router.post('/unsubscribe',async (req,res)=>{
    const {email}=req.body;
    const response=await unsubscribeUser(email)
    if(response==='Successful'){
        res.sendFile(path.join(dirname,'/public/feedback.html'))
    }
    res.send(response)

})

export { router as unsubscribeAPI}