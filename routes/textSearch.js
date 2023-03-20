import express from 'express';
import { textSearchInDB } from '../controllers/textSearch.js';

const router=express.Router();

router.post('/textSearch',async (req,res)=>{
    const dataToSearch=req.body.textToSearch;
    const response=await textSearchInDB(dataToSearch);
    res.send(response.rows);
})

export {router as textSearch}