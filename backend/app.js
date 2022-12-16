// requirements for express application
const express = require("express");
require("dotenv").config();
require("./Database/conf");
const cors = require("cors");
const join = require("path").join;
const bodyParser = require("body-parser");
const json = bodyParser.json;
const passport = require("passport");
const userRouter = require("./apis/UserApi");
const profileRouter = require("./apis/ProfileApi");
const companyRouter = require("./apis/CompanyApi");
const adminRouter = require("./apis/admin/AuthApi");
const adminRouter2 = require("./apis/admin/CategoryApi");
const adminRouter3 = require("./apis/admin/TagsApi");
const portfolioRouter = require("./apis/PortfolioApi");
const reasonRouter = require("./apis/reasonApi");
const khaltiRouter = require("./apis/KhaltiApi");
const postRouter = require("./apis/PostApi");
//const chatRouter = require("./apis/chatApi");
const messageRouter = require("./apis/messageApi");
const conversationRouter = require("./apis/conversationApi");

// Import passport middleware
require("./middlewares/passport-middleware");

// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use("/uploads", express.static(__dirname + "/uploads")); // so please use this code to fetch images form the server
app.use("/uploads", express.static("uploads"));

// Inject Sub router and apis
app.use("/users", userRouter);
app.use("/company", companyRouter);
app.use("/reason", reasonRouter);
app.use("/profile", profileRouter);
app.use("/admin", adminRouter, adminRouter2, adminRouter3);
app.use("/portfolio", portfolioRouter);
app.use("/khalti", khaltiRouter);
app.use("/posts", postRouter);
//app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/conversation", conversationRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}!`));
