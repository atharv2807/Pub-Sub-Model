import typeorm from 'typeorm'
import dotenv from 'dotenv';
import path from 'path';
import app from './index.js';
import pkg from 'pg';
const port=process.env.PORT || 4000;
const {Client} = pkg;
dotenv.config();


const dataSource=new typeorm.DataSource({
    type:'postgres',
    host:'localhost',
    user:'postgres',
    port:5432,
    password:process.env.DB_PASSWORD,
    database:'Atharv',
    entities:[path.join(__dirname,'..','entities/**.js')],
    synchronize:true
})

dataSource.initialize()
.then(()=>{
    console.log('DB Connected Successfully');
    app.listen(port,()=>{
    console.log(`Server is up and running at port: ${port}`);
})
})
.catch((err)=>{
    console.log('Error:',err);
})


export {dataSource}