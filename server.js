import dotenv from 'dotenv';
import app from './index.js';
import pkg from 'pg';
const {Client} = pkg;

dotenv.config();

const DB=new Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:process.env.DB_PASSWORD,
    database:'Atharv'
})

DB.connect()
.then(()=>{
    console.log("DB Connection Successful")
})
.catch((err)=>{
    console.log('Error',err)
})

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server is up and running at port: ${port}`);
})

export{DB};