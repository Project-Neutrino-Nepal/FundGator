import axios from "axios";
import myKey from "./KhaltiKey";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);

      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      axios
        .get(
          `http://localhost:5000/khalti/pay/verify/${data.token}/${data.amount}/${myKey.SecretKey}`
        )
        .then((response) => {
          console.log(response);
          toast.success(
            "Payment Successful, you will be redirected shortly to Protflio page"
          );
          setTimeout(() => {
            window.location.href = "http://localhost:3000/profile/Portfolio";
          }
          , 3000);

        })
        .catch((error) => {
          toast.error("Payment Failed, Please try again");
        });
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
