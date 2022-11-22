// requirements for express application
const express = require("express");
require("dotenv").config();
require("./Database/conf");
const cors = require("cors");
const json = require("body-parser").json;
const passport = require("passport");
const userRouter = require("./apis/UserApi");
const profileRouter = require("./apis/ProfileApi");
const companyRouter = require("./apis/CompanyApi");
const adminRouter = require("./apis/admin/AuthApi");
const adminRouter2 = require("./apis/admin/CategoryApi");
const adminRouter3 = require("./apis/admin/TagsApi");

// Import passport middleware
require("./middlewares/passport-middleware");

// Initialize express application
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
// app.use(express.static(join(__dirname, "./uploads")));

// Inject Sub router and apis
app.use("/users", userRouter);
app.use("/company", companyRouter);
app.use("/profile", profileRouter);
app.use("/admin", adminRouter, adminRouter2, adminRouter3);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}!`));
