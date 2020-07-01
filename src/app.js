const express = require("express");
const middleware = require("./middlewares/index");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 4000;

app.use("/", middleware);
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
