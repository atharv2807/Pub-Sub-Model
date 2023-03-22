import nodemailer from "nodemailer";
import { dataSource } from "./../server.js";
import { messageSchema } from "../entities/message.js";
import { userSchema } from "../entities/user.js";
export async function writeMessageIntoDB(name, message) {
  try {
    const messageTable = dataSource.getRepository(messageSchema);
    const messageRecord = new messageSchema();
    messageRecord.first_name = name.split(" ")[0];
    messageRecord.last_name = name.split(" ")[1];
    messageRecord.message = message;

    await messageTable.save(messageRecord);
    return "Successful";
  } catch (err) {
    return err.message;
  }
}

export async function sendTheMails(subject, mailMessage) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USERNAME_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const messageRepo = dataSource.getRepository(userSchema);
    const response = await messageRepo.find({ first_name, email });
    res = res.rows;
    res.forEach((mailData) => {
      let details = {
        from: "agoel@deqode.com",
        to: mailData.email,
        subject: subject,
        text: `Hello ${mailData.name}, \n\n ${mailMessage}`,
      };
      transporter.sendMail(details, (err) => {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Mail sent");
        }
      });
    });
    return "Successful";
  } catch (err) {
    return err.message;
  }
}
