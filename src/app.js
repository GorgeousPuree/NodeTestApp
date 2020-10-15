const express = require("express");
const middleware = require("./middlewares/index");
const routes = require("./routes/index");

const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/", middleware);
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
