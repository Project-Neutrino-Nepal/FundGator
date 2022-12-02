
import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../wrapper/Detail";
import highlights from "../utils/highlights";


const Detail = () => {
  const [reason, setReason] = useState({});
 const reasons = [];
  
  axios.get(
      "http://localhost:5000/reason/api/get-reasons/:id"


    ).then((res) => {
       reasons = res.data.reasons;
       console.log(reasons);
    });



  };

    // setReason(res.data);
    // console.log(res.data);
   

  useEffect(() => {
    getReason();
  }, []);




  return (
    <Wrapper>
      <section className="financial">
        <h3>Financial</h3>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
        molestiae tenetur ex beatae illo molestias assumenda fuga inventore!
        Saepe iusto libero fuga.
      </section>

      
          
      <section className="highlights">
        {reasons.map((item, index) => {
          return (
            <div className="list">
              <div className="number">{index + 1}</div> {item.text}
            </div>
          );
        })}
      </section>

      <section className="other-disclosure">
        <h3>Other Disclosures</h3>

        <h5>The Board of Directors</h5>

        <table>
          <tr>
            <th>Director</th>
            <th>Ocuupation</th>
            <th>Joined</th>
          </tr>
          <tr>
            <td>Sanjay Mandava</td>
            <td> CEO @ XReal Estate Incorporated</td>
            <td>2022</td>
          </tr>
        </table>

        <h5>Officer</h5>

        <table>
          <tr>
            <th>Director</th>
            <th>Ocuupation</th>
            <th>Joined</th>
          </tr>
          <tr>
            <td>Sanjay Mandava</td>
            <td> CEO @ XReal Estate Incorporated</td>
            <td>2022</td>
          </tr>
          <tr>
            <td>Sanjay Mandava</td>
            <td> CEO @ XReal Estate Incorporated</td>
            <td>2022</td>
          </tr>
          <tr>
            <td>Sanjay Mandava</td>
            <td> CEO @ XReal Estate Incorporated</td>
            <td>2022</td>
          </tr>
        </table>

        <h5>Voting Power</h5>

        <table>
          <tr>
            <th>Director</th>
            <th>Ocuupation</th>
            <th>Joined</th>
          </tr>
          <tr>
            <td>Sanjay Mandava</td>
            <td> CEO @ XReal Estate Incorporated</td>
            <td>2022</td>
          </tr>
          <tr>
            <td>Sanjay Mandava</td>
            <td> CEO @ XReal Estate Incorporated</td>
            <td>2022</td>
          </tr>
          <tr>
            <td>Sanjay Mandava</td>
            <td> CEO @ XReal Estate Incorporated</td>
            <td>2022</td>
          </tr>
        </table>

        <h5>Outstanding Debts</h5>
        <p>none</p>

        <h5> Use of Funds</h5>
        <table>
          <tr>
            <th>$50,000</th>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              maiores quaerat odit?
            </td>
          </tr>
          <tr>
            <th>$50,000</th>
            <td>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
              maiores quaerat odit?
            </td>
          </tr>
        </table>

        <h5>Capital Struture</h5>
        <table className="capital">
          <tr>
            <th>Class of Security</th>
            <th>Aecurities(or Amount) Authorized</th>
            <th>Securities (or Amount) Outstanding</th>
            <th>Voting</th>
          </tr>

          <tr>
            <td>Common Stock</td>
            <td>10,000,000</td>
            <td>10,000,000</td>
            <td>Yes</td>
          </tr>
        </table>

        <h5>The Funding Portal</h5>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem sequi cum nam.</p>
      
        <h5>Form C filing on EDGAR</h5>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, quibusdam rerum! Eligendi?</p>
      </section>


    </Wrapper>
  );
};

export default Detail;
