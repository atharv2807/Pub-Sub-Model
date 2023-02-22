import nodemailer from 'nodemailer';
import {DB} from './../server.js';

export async function writeMessageIntoDB(name,message){

    const query={
        text:'INSERT INTO MessageList VALUES($1, $2)',
        values:[name,message]
    }
    const responseFromMessageSave=await DB.query(query);
}

export async function sendTheMails(mailMessage){
    let transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USERNAME_ID,
        pass:process.env.MAIL_PASSWORD
    }
})
    let mailList;
    const res=await DB.query('SELECT email FROM MailList')
    mailList=res.rows;
    let listOfMails=[];
    mailList.forEach((e)=>{
        listOfMails.push(e['email'])
    })
    let details={
        from:"agoel@deqode.com",
        to: listOfMails,
        subject:"Broadcast Message",
        text:mailMessage
    }
    transporter.sendMail(details,(err)=>{
        if(err){
            console.log("Error",err)
        }else{
            console.log("Mail sent successfully");
        }
    })

}