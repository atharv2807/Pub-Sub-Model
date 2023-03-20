import express from 'express';
import { dirname } from './../index.js';
import path from 'path'

const router=express.Router();

router.get('/textSearch',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/textSearch.html'))
})

export { router as getTextSearchPage}