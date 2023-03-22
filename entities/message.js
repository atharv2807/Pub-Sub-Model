import { EntitySchema } from "typeorm";

export const messageSchema = new EntitySchema({
  name: "Message",
  tableName: "message",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    first_name: {
      type: "varchar",
    },
    last_name: {
      type: "varchar",
    },
    messageData: {
      type: "varchar",
    },
  },
});
