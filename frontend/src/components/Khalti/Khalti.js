import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./KhaltiConfig";

export default function  Khalti() {
    let checkout = new KhaltiCheckout(config);

    let buttonStyles ={
        background: "purple",
        padding :'10px',
        color: "white",
        Cursor :'pointer',
        fontWeight: 'bold',
        border: '1px solid white'

    }
  return (
    <div>
    <button onClick={()=>checkout.show({amount: 1000})} style={buttonStyles}> Pay Via Khalti</button>
    </div>
  );
}
