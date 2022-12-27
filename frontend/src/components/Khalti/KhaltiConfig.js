import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myKey from "./KhaltiKey";

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get(
          `http://localhost:5000/khalti/pay/verify/${data.token}/${data.amount}/${myKey.SecretKey}`
        )
        .then((response) => {
          invest();
          toast.success(
            "Payment Successful, you will be redirected shortly to Protflio page"
          );
          setTimeout(() => {
            window.location.href = "http://localhost:3000/homepage/one";
          }, 3000);
        })
        .catch((error) => {
          toast.error("Payment Failed, Please try again");
        });
      const invest = async () => {
        const investData = {
          id: payload.product_identity,
          amount: payload.amount / 100,
        };
        try {
          await axios
            .post(
              "http://localhost:5000/portfolio/api/create-portfolio",
              investData,
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              }
            )
            .then((response) => {
              console.log(response);
              toast.success("Investment Successful");
            });
        } catch (error) {
          console.log(error);
        }
      };
    },

    // onError handler is optional
    onError(error) {
      // handle errors
      toast.error("Payment Failed, Please try again");
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
