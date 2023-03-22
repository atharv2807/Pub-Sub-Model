// import {DB} from './../server.js';
import _ from "lodash";
export async function registerEmail(name, email) {
  try {
    const queryForMails = {
      text: "Select email from maillist",
    };
    const maillist = await DB.query(queryForMails);
    const arrayOfEmails = maillist.rows;
    const index = _.findIndex(arrayOfEmails, { email: email });
    if (index >= 0) {
      throw new Error("Email Already Registered");
    }
    const query = {
      text: "INSERT INTO maillist VALUES($1,$2)",
      values: [name, email],
    };
    await DB.query(query);
    return "Successful";
  } catch (err) {
    return err.message;
  }
}
