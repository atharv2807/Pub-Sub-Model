// import {DB} from './../server.js';

export async function textSearchInDB(dataToSearch) {
  const responseFromSearch = await DB.query(
    "SELECT * FROM MessageList WHERE message LIKE " +
      "'" +
      "%" +
      dataToSearch +
      "%" +
      "'"
  );
  return responseFromSearch;
}
