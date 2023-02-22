import {DB} from './../server.js';
export async function registerEmail(name,email){
    await DB.query("INSERT INTO MailList(name,email) VALUES('" + name + "','" + email + "')",(err,res)=>{
        if(err){
            console.log("Error",err);
        }else{
            console.log("Response",res);
        }
    })
}