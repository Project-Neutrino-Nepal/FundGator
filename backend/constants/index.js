require("dotenv").config();


// module.exports = DB = process.env.APP_DB;
module.exports = SECRET = process.env.APP_SECRET;
module.exports = DOMAIN = process.env.APP_DOMAIN;
module.exports = HOST_EMAIL = process.env.APP_HOST_EMAIL;
module.exports = SENDGRID_API = process.env.SENDGRID_API;
module.exports = PORT = process.env.PORT || process.env.APP_PORT;
