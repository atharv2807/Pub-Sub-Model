import typeorm from "typeorm";
import dotenv from "dotenv";
import app from "./index.js";
import { messageSchema } from "./entities/message.js";
import { userSchema } from "./entities/user.js";

const port = process.env.PORT || 4000;

dotenv.config();

const dataSource = new typeorm.DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: "Atharv",
  entities: [userSchema, messageSchema],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(port, () => {
      console.log(`Server is up and running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error:", err);
  });

export { dataSource };
