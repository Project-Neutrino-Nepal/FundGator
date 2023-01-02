// requirements for express application
const express = require("express");
const router = express.Router();

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
const chatRouter = require("./apis/ChatApi");
const messageRouter = require("./apis/MessageApi");
const questionRouter = require("./apis/questionApi");
const feedbackRouter = require("./apis/FeedbackApi");
const notification = require("./apis/NotificationApi");
const Notification = require("./models/notificationModel");
// Import passport middleware
require("./middlewares/passport-middleware");
// Initialize express application
const app = express();
// Apply Application Middlewares
app.use(cors());
app.use(json());
//app.use(morgan("dev"));
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
app.use("/chat", chatRouter);
app.use("/message", messageRouter);
app.use("/question", questionRouter);
app.use("/feedback", feedbackRouter);
app.use("/notification", notification);

// --------------------------DEVELOPMENT------------------------------
let companyList = [];
let verifyList = [];
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on PORT ${process.env.PORT}`)
);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
  pingTimeout: 60 * 1000,
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("newCompany", (company) => {
    companyList.unshift(company);
    // Create new notification document
    const notification = new Notification({
      company: company.companyID,
    });

    // Save notification to database
    notification.save((error, result) => {
      if (error) throw error;
      console.log("Notification saved to database");
    });
    //sends the events back to the React app
    socket.broadcast.emit("sendMessage-admin1", companyList);

    socket.broadcast.emit("sendMessage-admin", companyList);
  });

  socket.on("verify-company",(company)=>{
    verifyList.unshift(company);

    const notification = new Notification({
      company: company.companyID,
    });
      // Save notification to database
      notification.save((error, result) => {
        if (error) throw error;
        console.log("Notification saved to database");
      });
      //sends the events back to the React app
      socket.broadcast.emit("sendMessage-investor1", verifyList);
      socket.broadcast.emit("sendMessage-investor", verifyList);

  })

 

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));

  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat[0]; // Change it to object

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) {
        return;
      } else if (user._id !== newMessageRecieved.sender._id) {
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      }
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
  // close the socket connection
  socket.disconnect(true);
});

 

