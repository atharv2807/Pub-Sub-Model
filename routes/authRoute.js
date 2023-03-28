import express from 'express';
import { dirname } from './../index.js'; 
import path from 'path'
import passport from 'passport';
const router=express.Router();


// Login Page
router.get('/login',(req,res)=>{
    res.sendFile(path.join(dirname,'/public/loginWithGoogle.html'))
})

// Authenticating using google
router.get('/google',passport.authenticate('google',{
    scope:['email','profile']
}))

// Redirecting the user back to our site
router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.redirect('/loginSuccess')
})

export { router as authRoutes }