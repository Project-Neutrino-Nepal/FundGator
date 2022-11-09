// requirements for express application
const express = require("express");
require("dotenv").config();
require("./Database/conf");
const cors = require("cors");
const json = require("body-parser").json;

const userRouter = require("./apis/UserApi");

// Import passport middleware
require("./middlewares/passport-middleware");

// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
// app.use(passport.initialize());
// app.use(express.static(join(__dirname, "./uploads")));

// Inject Sub router and apis
app.use("/users", userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}!`));
