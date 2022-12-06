const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth-guard");
const axios = require("axios");

router.get("/pay/verify/:token/:amount/:secretkey", async (req, res) => {
  const data = {
    token: req.params.token,
    amount: req.params.amount,
  };

  const config = {
    headers: {
      Authorization: `Key ${req.params.secretkey}`,
    },
  };
  await axios
    .post("https://khalti.com/api/v2/payment/verify/", data, config)
    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
