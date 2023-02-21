import {Client} from "pg";
const client=new Client({
    host:'locahost',
    user:'postgres',
    port:5432,
    password:process.env.DBPASSWORD,
    database:'postgres'
})
client.connect();
client.query('SELECT * FROM users',(err,res)=>{
    if(err){
        console.log("Error",err);
    }else{
        console.log(res);
    }
})