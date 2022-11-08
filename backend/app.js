// requirements for express application
const express = require("express");
require("dotenv").config();

const app = express();

require("./Database/conf");
const userRouter = require("./routes/registerRoute");

app.use(express.json());
app.use(userRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}!`));
