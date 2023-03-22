import { dataSource } from "../server.js";
import { userSchema } from "../entities/user.js";

export async function registerEmail(name, email) {
  try {
    const userTable=dataSource.getRepository(userSchema);
    const userDetails={
      first_name:name.split(' ')[0],
      last_name:name.split(' ')[1],
      email:email
    }
    const user=await userTable.save(userDetails);
    return "Successful";
  } catch (err) {
    return err.message;
  }
}
