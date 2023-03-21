import { EntitySchema } from "typeorm";

export const userSchema=new EntitySchema({
    name:"UserDetails",
    tableName:"UserDetails",
    columns:{
        id:{
            primary:true,
            type:"int",
            generated:true
        },
        first_name:{
            type:"varchar"
        },
        last_name:{
            type:"varchar"
        },
        email:{
            unique:true,
            type:'varchar'
        }
    }
})