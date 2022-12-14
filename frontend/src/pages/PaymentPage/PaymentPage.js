import React, { useState } from "react";
import Wrapper from "./wrapper/PaymentPage";
import Accordion from "./component/Accordion";
import accordion from "./utils/accordion";
import { RiSecurePaymentFill } from "react-icons/ri";
import { RiBankFill, RiBankCardFill } from "react-icons/ri";
import countryList from "./utils/countryList";
import { useParams } from "react-router-dom";
const options = {
  amount: "",
  result: 0,
  total: 0,
  nationality: "Nepal",
  city: "kathmandu",
  address: "Kathmandu",
  postalcode: "",
  fullname: "John Doe",
  regional: "Bagmati",
  isedit: false,
  isagreed: false,
};
const PaymentPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(false);
  const [option, setOption] = useState(options);
  const taxes = (price) => {
    const result = Math.round((8 / 100) * price);
    const total = parseInt(result) + parseInt(price);
    setOption({
      ...option,
      result: price ? result : 0,
      total: price ? total : 0,
      amount: price,
    });
  };

  const handleChange = (e) => {
    setOption({
      ...option,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Wrapper>
      <div className="left-side">
        <div className="info">
          <h4>INVEST IN</h4>
          <h1>{id}</h1>
          <p>{id} is preparing their legal paperwork</p>
        </div>
        <div className="two">
          <span>1.</span>
          <div className="input-container">
            <span>Reserved Investment Amount</span>
            <div className="input-filed">
              ${" "}
              <input
                type="number"
                value={option.amount}
                onChange={(e) => taxes(e.target.value)}
              />
            </div>
          </div>
        </div>

        <section className="investor-info">
          <div className="two">
            <span>2.</span>
            <div className="input-container">
              <span>Investor info</span>
              <span className="ms-3">
                <RiSecurePaymentFill />{" "}
              </span>
            </div>
          </div>

          <div
            className={
              !option.isedit
                ? " border rounded-1 mx-lg-4 border-1 p-3 d-flex align-items-center justify-content-between"
                : "d-none"
            }
          >
            <div className="d-flex flex-column">
              <span className="text-dark fw-bold ">{option.fullname}</span>
              <p>
                {option.regional},{option.city},{option.nationality}
              </p>
            </div>
            <button
              className="btn text-primary"
              onClick={() => setOption({ ...option, isedit: true })}
            >
              edit
            </button>
          </div>

          <div className={option.isedit ? "d-flex flex-column edit-option px-lg-4" : "d-none"}>
            <p className="">Investing as Myself</p>
            <input
              type="text"
              className="form-control form-control-lg rounded-0"
              placeholder="Full Name"
              name="fullname"
              onChange={handleChange}
              value={option.fullname}
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              className="form-control form-control-lg rounded-0 mt-2"
              value={option.address}
              onChange={handleChange}
            />
            <div className="d-flex mt-2 gap-2 ">
              <input
                type="text"
                className="form-control form-control-lg rounded-0 "
                placeholder="city"
                name="city"
                value={option.city}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Regional"
                name="regional"
                className="form-control form-control-lg rounded-0"
                onChange={handleChange}
                value={option.regional}
              />

              <input
                type="number"
                name="postalcode"
                id=""
                className="form-control form-control-lg rounded-0 input-number"
                placeholder="Postal Code"
                onChange={handleChange}
                value={option.postalcode}
               
              />
            </div>
            <select
              className="form-select form-select-lg rounded-0 fs-6 mt-2"
              aria-label="Default select example"
              name="nationality"
              onChange={handleChange}
              value={option.nationality}
            >
              <option selected value="">
                Nationality
              </option>
              {countryList.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </section>

        <div className="three">
          <div className="two">
            <span>3.</span>
            <div className="input-container">
              <span>Fund Your Reservation</span>
              <span className="ms-3">
                <RiSecurePaymentFill />{" "}
              </span>
            </div>
          </div>

          <div className={card ? "account active mx-lg-4 " : "account mx-lg-4"}>
            <div
              className={card ? "bankAccount active " : "bankAccount"}
              onClick={() => setCard(true)}
            >
              <input type="radio" checked={card ? true : false} name="" id="" />
              <span>Back Account</span>
              <span>
                <RiBankFill />{" "}
              </span>
            </div>

            <div className="d-flex flex-column">
              <div className="d-flex  align-items-center justify-content-between">
                <span>Acount type</span>
                <div className="d-flex align-items-center">
                  <input type="radio" className="me-2" name="" id="" />
                  <span>Checking</span>
                  <input type="radio" className="ms-2 me-2" name="" id="" />
                  <span>Saving</span>
                </div>
              </div>
              <div className="d-flex flex-column gap-2">
                <input
                  type="text"
                  className="form-control rounded-0 "
                  placeholder="Name on Account"
                />
                <input
                  type="text"
                  className="form-control rounded-0 "
                  placeholder="Bank Name"
                />

                <div className="d-flex gap-2">
                  <input
                    type="text"
                    className="form-control rounded-0 "
                    placeholder="Routing Number"
                  />
                  <input
                    type="text"
                    className="form-control rounded-0 "
                    placeholder="Account Number"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={!card ? "account active mx-lg-4" : "account mx-lg-4"}>
            <div
              className={!card ? "bankAccount active" : "bankAccount"}
              onClick={() => setCard(false)}
            >
              <input
                type="radio"
                checked={!card ? true : false}
                name=""
                id=""
              />
              <span>Credit Card</span>
              <span>
                <RiBankCardFill />{" "}
              </span>
            </div>

            <div className="d-flex credit-card mt-3">
              <input
                type="text"
                className="form-control rounded-0 "
                placeholder="Routing Number"
              />
              <input
                type="text"
                className="form-control date rounded-0  "
                placeholder="01/22"
              />
              <input
                type="text"
                placeholder="CCV"
                className="CVV form-control rounded-0"
              />
            </div>
          </div>
        </div>

        <section className="legal-stuff">
          <div className="two">
            <span>4.</span>
            <div className="input-container">
              <span>Complete Investment Amount</span>
            </div>
          </div>

          <div className="border border-1  mx-lg-4">
            <ul className="p-3">
              <li className="list-group-item fs-7 text-muted ">
                I’ve read the Investor{" "}
                <span className="text-primary ">FAQ</span>. I understand
                startups are risky and can afford to lose my entire investment.
              </li>
              <li className="list-group-item text-muted  ">
                I understand these investments are not easily resold. I can wait
                years for a return.
              </li>
              <li className="list-group-item text-muted  ">
                I understand Wefunder does not offer investment advice. I am
                making my own investment decisions.
              </li>
              <li className="list-group-item text-muted   ">
                I am complying with my{" "}
                <span className="text-primary"> annual investment limit</span>.
              </li>

              <li className="text-muted list-group-item">
                I understand I can cancel my investment and obtain a refund up
                to 48 hours before a closing.
              </li>
              <li className="text-muted list-group-item">
                I agree to the contracts with my electronic signature and
                authorize Wefunder to debit my account.
              </li>
              <li className="list-group-item">
                I understand that if I'm an{" "}
                <span className="text-primary">accredited investor</span> I may
                be transitioned into a concurrent Reg D.
              </li>
            </ul>
            <div className="d-flex bg-dark bg-opacity-25 fs-6 d-flex gap-3 align-items-center p-2">
              <input
                type="checkbox"
                name="isaggreed"
                value={option.isagreed}
                onChange={() =>
                  setOption({ ...option, isagreed: !option.isagreed })
                }
                id=""
                className=""
                style={{ height: "25px", width: "25px" }}
              />
              <span>
                I agree to this and the{" "}
                <span className="text-primary">Terms & Conditions</span>
              </span>
            </div>
          </div>
        </section>

        <section className="complete-investment">
          <div className="two">
            <span>5.</span>
            <div className="input-container">
              <span>Legal Stuff</span>
            </div>
          </div>
          <p className="px-lg-4">i authorize FunGator to debit my bank account</p>

          <div className="calcuations border-1 border p-2 mx-lg-4 ">
            <div className="d-flex justify-content-between w-100 fs-5 ">
              <span>Reservation amount</span>
              <span>${option.amount ? option.amount : 0}</span>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <span>Extimated fees</span>
              <span>${option.result}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-4">
              <span>Transferring to FunGator Cash</span>
              <span>${option.total}</span>
            </div>
          </div>
          <button
            className=" w-100 btn btn-success rounded-0 fw-bolder  mt-4  border-0 p-2 "
            style={{ background: "#26C897" }}
          >
            FUND RESERVATION
          </button>
        </section>
      </div>
      <div className="right-side">
        <div className="border-card">
          <h6>Deal Terms</h6>
          <h6>Future Equity</h6>
          <span>$ 30M valuation cap</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            quo accusantium rerum ipsa nulla molestiae deleniti non, officia
            ipsam dolor, officiis exercitationem.
          </p>
        </div>

        <div className="border-card">
          <h6>Contracts</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis, molestias! Excepturi, facere.
          </p>
        </div>

        <div className="border-card">
          <h6>FAQ & Help</h6>
          {accordion.map((item) => {
            return <Accordion item={item} key={item.id} />;
          })}
        </div>
      </div>


    </Wrapper>
  );
};

export default PaymentPage;
