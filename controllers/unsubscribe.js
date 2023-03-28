import { dataSource } from "../server.js";
import { userSchema } from "../entities/user.js";

export async function unsubscribeUser(emailId) {
  try {
    const userRecord=dataSource.getRepository(userSchema)
    const recordToDelete=await userRecord.findBy({email:emailId})
    // console.log(recordToDelete);;
    if(recordToDelete.length === 0){
      throw new Error('Email was not found')
    }
    userRecord.delete(recordToDelete);
    return "Successful";
  } catch (err) {
    return err.message;
  }
}
