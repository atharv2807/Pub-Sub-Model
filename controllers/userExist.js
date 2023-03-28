import { userSchema } from "../entities/user.js";
import { dataSource } from "../server.js";

export async function checkUserExists(emailId){
    try{
        const userTable=await dataSource.getRepository(userSchema)
        .createQueryBuilder('user')
        .where("user.email = :d",{ d : emailId })
        .getOne();
        if(userTable===null){
            return [false,null]
        }
        return [true,userTable];
    }catch(err){
        console.log(err);
    }
}

export async function userById(id){
    try{
        const userTable=await dataSource.getRepository(userSchema)
        .createQueryBuilder('user')
        .where("user.id = :d",{ d : id })
        .getOne();
        return userTable;
    }catch(err){
        console.log(err);
    }
}