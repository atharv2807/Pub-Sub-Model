import { EntitySchema } from "typeorm";

export const messageSchema = new EntitySchema({
  name: "message",
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
