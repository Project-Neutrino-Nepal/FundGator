import React, { useState } from "react";
import Wrapper from "../wrapper/Setting";
import UserInput from "./smallcomponent/UserInput";
import Passwordinput from "./smallcomponent/Passportinput";
const Settings = () => {
  const item = {
    email: "Dpa@gmail.com",
    Phone: "12345678910",
    Birthday: "",
    Nationality: "",
    TaxId: "",
    pnumber: "",
    pissuedate: "",
    pexpirationdate: "",
    pissuingcountry: "",
    AnnualIncome: "",
    NetWorth: "",
    DisplayName: "",
    FundGatorUrl: "",
    Bio: "",
    Skills: "",
    Website: "",
  };

  const [formvalue, setform] = useState(item);
  const onsave = ({ name, value }) => {
    setform({ ...formvalue, [name]: value });
    console.log("saved");
  };

  const passsave = ({
    name,
    name1,
    name2,
    name3,
    value,
    value1,
    value2,
    value3,
  }) => {
    setform({
      ...formvalue,
      [name]: value,
      [name1]: value1,
      [name2]: value2,
      [name3]: value3,
    });
  };
  return (
    <Wrapper>
      <div className="left-container">
        <p>Account</p>
        <p>Investor Limits</p>
        <p>Publice Profile</p>
        <p>Public Profile</p>
      </div>
      <div className="right-container">
        <section className="account">
          <h1>Account</h1>
          <UserInput
            name={"email"}
            value={formvalue.email}
            question={"whats your email"}
            onsave={onsave}
            type={"email"}
            placeholder={"Enter Your Email"}
          />
          <div className="passwordreset hover">
            <span>Password</span>
            <span>Reset</span>
          </div>
          <div className="btn-delete hover">
            <span>Delete Account</span>
          </div>
        </section>
        <section className="investorinfo">
          <h4>Investorinfo</h4>
          <UserInput
            name={"Phone"}
            value={formvalue.Phone}
            question={"whats your PhoneNumber ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter your PhoneNumber"}
          />

          <UserInput
            name={"Birthday"}
            value={formvalue.Birthday}
            question={"whats your Birthday ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"mm//dd//yyyy"}
          />

          <UserInput
            name={"Nationality"}
            value={formvalue.Nationality}
            question={"Contry of Nationality ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter you Nationality"}
          />

          <UserInput
            name={"TaxID"}
            value={formvalue.Nationality}
            question={"Whats your Tax Id ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter Tax Id"}
          />
          <Passwordinput
            name={"pnumber"}
            name1={"pexpirationdate"}
            name2={"pissuingcountry"}
            name3={"pissuedate"}
            value={formvalue.pnumber}
            value1={formvalue.pexpirationdate}
            value2={formvalue.pissuingcountry}
            value3={formvalue.pissuedate}
            onsave={passsave}
          />
        </section>
        <section className="investorlimit">
          <h4>Investorlimit</h4>

          <UserInput
            name={"AnnualIncome"}
            value={formvalue.AnnualIncome}
            question={"Whats your Annual Income ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter AnnualIncom"}
          />
          <UserInput
            name={"NetWorth"}
            value={formvalue.NetWorth}
            question={"Whats your NetWorth ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter NetWorth"}
          />
        </section>
        <section className="publicprofile">
          <h4 className="margin-block">Public Profile</h4>

          <UserInput
            name={"Display Name"}
            value={formvalue.AnnualIncome}
            question={"Whats your Annual Income ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter Your Display Name"}
          />
          <UserInput
            name={"FundGatorUrl"}
            value={formvalue.FundGatorUrl}
            question={"Whats your Fund Gator Url ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter FundGator Url"}
          />

          <UserInput
            name={"Bio"}
            value={formvalue.Bio}
            question={"Whats your Bio ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter Your Bio"}
          />

          <UserInput
            name={"Website"}
            value={formvalue.Website}
            question={"Whats your Website ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter Your Website"}
          />

          <UserInput
            name={"Skills"}
            value={formvalue.Skills}
            question={"Whats your Skills ?"}
            onsave={onsave}
            type={"text"}
            placeholder={"Enter Your Skills"}
          />

          <div className="privacy">
            <h6>privacy</h6>
            <div className="check">
              <div className="content">
                <input type="checkbox" name="" id="" />
                <span>Hide InvestMent</span>
              </div>
              <div className="content">
                <input type="checkbox" name="" id="" />
                <span>Hide from search engine</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default Settings;
