import { Sequelize } from "sequelize-typescript";

export default async () => {
  const sequelize = await new Sequelize(process.env.SQL_CONNECTION_URL, {
    define: {
      timestamps: false,
    },
    dialect: "postgres",
    models: [__dirname + "./models"],
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("database connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};
