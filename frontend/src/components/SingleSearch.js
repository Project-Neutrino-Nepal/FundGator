import React from "react";
import Wrapper from "./admin/components/wrapper/Header";

function SingleSearch({ data }) {
  console.log(data);
  return (
    <Wrapper
      className="notify rounded-2"
      style={{ height: "400px", overflowY: "scroll" }}
    >
      <div>
        {data.map((data) => {
          return (
            <>
              <div
                class="card border border-dark btn m-1"
                onClick={() => {
                  window.location.href = `/profiles/${data._id}`;
                }}
              >
                <div class="card-body">
                  <h4>{data.name}</h4>
                  <p>{data.email}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </Wrapper>
  );
}

export default SingleSearch;
