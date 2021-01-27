const execSync = require("child_process").execSync;

const runSequelizeCommand = async (command) => {
  try {
    execSync(__dirname + "/../../node_modules/.bin/sequelize " + command, {
      stdio: "inherit",
    });
  } catch (e) {}
};

initDB = async () => {
  await runSequelizeCommand("db:create");
  await runSequelizeCommand("db:migrate");
  await runSequelizeCommand("db:seed:all");
};

initDB().then();
