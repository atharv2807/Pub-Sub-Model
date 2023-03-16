import nodemailer from 'nodemailer';
import {DB} from './../server.js';

export async function writeMessageIntoDB(name,message){
    try{
        const query={
            text:'INSERT INTO MessageList VALUES($1, $2)',
            values:[name,message]
        }
        await DB.query(query);
        return 'Successful'
    }catch(err){
        return err.message;

    }

}

export async function sendTheMails(subject,mailMessage){
    try{
        let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.USERNAME_ID,
                pass:process.env.MAIL_PASSWORD
            }
            })
            let res=await DB.query('SELECT name,email FROM MailList')
            res=res.rows
            res.forEach((mailData)=>{
                let details={
                    from:"agoel@deqode.com",
                    to: mailData.email,
                    subject:subject,
                    text: `Hello ${mailData.name}, \n\n ${mailMessage}`
                }
                transporter.sendMail(details,(err)=>{
                    if(err){
                        console.log("Error",err)
                    }else{
                        console.log("Mail sent");
                    }
                })
            })
        return 'Successful'
    }catch(err){
        return err.message;
    }

}