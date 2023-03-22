import { messageSchema } from "../entities/message.js";
import { dataSource } from "../server.js";

export async function textSearchInDB(dataToSearch) {
  try{
    const messageRepo=await dataSource.getRepository(messageSchema)
    .createQueryBuilder('user')
    .where("user.messageData LIKE :d",{d: `%${dataToSearch}%`})
    .getMany();
    return messageRepo;
  }catch(err){
    return err.message;
  }
}
