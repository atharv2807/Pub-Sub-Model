import express from 'express';
import { unsubscribeUser } from '../controllers/unsubscribe.js';
import path from 'path'
const router = express.Router();

router.post('/unsubscribe',async (req,res)=>{
    const {email}=req.body;
    const response=await unsubscribeUser(email)
    if(response==='Successful'){
        res.sendFile(path.join(__dirname,'/public/feedback.html'))
    }

})

export { router as unsubscribeAPI}