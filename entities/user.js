import { EntitySchema } from "typeorm";

export const userSchema=new EntitySchema({
    name:"mailerList",
    tableName:"mailerList",
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true,
        },
        first_name:{
            type:"varchar",
        },
        last_name:{
            type:"varchar",
        },
        email:{
            unique:true,
            type:'varchar'
        }
    }
})

