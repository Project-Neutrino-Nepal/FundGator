import React from "react";
import Wrapper from "../wrapper/Detail";
const Detail = ({ company, investors }) => {
  const Revenue = company.fundRaised;
  const FundGoal = company.fundGoal;
  const ID = company.id;

  const RevenueGrowth = (Revenue / FundGoal) * 100;

  const marketCap = RevenueGrowth * 1000000;

  // get top investor of the company
  

  return (
    <Wrapper>
      <section className="financial">
        <h3>Financial</h3>
        <div className="financial__details">
          <div className="financial__details--table">
            <table className="broder-5 table">
              <tbody>
                <tr>
                  <td>Revenue</td>
                  <td>{Revenue}</td>
                </tr>
                <tr>
                  <td>Revenue Growth</td>
                  <td>{RevenueGrowth}</td>
                </tr>
                <tr>
                  <td>Market Cap</td>
                  <td>{marketCap}</td>
                </tr>
                <tr>
                  <td>Equity</td>
                  <td>{company.totalEquity}</td>
                </tr>
                <tr>
                  <td>Equity Sold</td>
                  <td>{company.soldEquity}</td>
                </tr>
                <tr>
                  <td>Equity Released</td>
                  <td>{company.releasedEquity}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="financial__details--table">
            <table className="broder-5 table">
              <tbody>
                <tr>
                  <td>Profile</td>
                  <td>{investors.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Detail;
