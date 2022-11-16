// requirements for express application
const express = require("express");
require("dotenv").config();
require("./Database/conf");
const cors = require("cors");
const json = require("body-parser").json;

const userRouter = require("./apis/UserApi");
const profileRouter = require("./apis/ProfileApi");


// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
// app.use(express.static(join(__dirname, "./uploads")));

// Inject Sub router and apis
app.use("/users", userRouter);
app.use("/profile", profileRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}!`));
