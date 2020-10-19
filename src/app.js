require("dotenv").config();

const express = require("express");

const middleware = require("./middlewares");
const routes = require("./routes");

const app = express();
const PORT = process.env.app_port;
const { initializeDb } = require("./db");

app.use("/", middleware);
app.use("/", routes);

async function initialize() {
  await initializeDb();

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}

initialize();
