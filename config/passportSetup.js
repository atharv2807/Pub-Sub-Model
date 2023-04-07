import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
import { registerEmail } from './../controllers/subscribe.js';
import { checkUserExists, userById } from "../controllers/userExist.js";
dotenv.config();

// Serialzing User
passport.serializeUser((user,done)=>{
    done(null,user.id)
})

// Deserializing User
passport.deserializeUser((id,done)=>{
    userById(id).then((user)=>{
        done(null,user)
    })
})



passport.use('google', new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/auth/google/redirect'
},async (accessToken,refreshToken,emailScope,profileScope,done)=>{
    console.log(accessToken);
    console.log(refreshToken);
    const emailId=profileScope._json.email
    const name=profileScope.displayName
    const isUserExist=await checkUserExists(emailId);
    if(isUserExist[0]){
        done(null,isUserExist[1])
    }else{
          const user=await registerEmail(name,emailId)
          done(null,user)
        }
    }
))

