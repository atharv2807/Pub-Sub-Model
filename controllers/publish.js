import nodemailer from "nodemailer";
import { dataSource } from "./../server.js";
import { messageSchema } from "../entities/message.js";
import { userSchema } from "../entities/user.js";

export async function writeMessageIntoDB(name, message) {
  try {
    console.log('writeMessageIntoDB executed');
    const messageTable = dataSource.getRepository(messageSchema);
    const messageRecord={
      first_name:name.split(" ")[0],
      last_name: name.split(" ")[1],
      messageData:message
    }
    await messageTable.save(messageRecord);
    return "Successful";
  } catch (err) {
    return err.message;
  }
}

export async function sendTheMails(subject, mailMessage) {
  try {
    console.log('sendTheMails executed');

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USERNAME_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const userRepo=dataSource.getRepository(userSchema);
    const res=await userRepo.find();

    res.forEach((mailData) => {
      let details = {
        from: process.env.USERNAME_ID,
        to: mailData.email,
        subject: subject,
        text: `Hello ${mailData.first_name}, \n\n ${mailMessage}`,
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
