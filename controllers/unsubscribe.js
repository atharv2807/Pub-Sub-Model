// import { DB } from "./../server.js";
export async function unsubscribeUser(emailId) {
  try {
    const query = {
      text: "DELETE FROM maillist WHERE email=($1)",
      values: [emailId],
    };
    await DB.query(query);
    return "Successful";
  } catch (err) {
    return res.err;
  }
}
