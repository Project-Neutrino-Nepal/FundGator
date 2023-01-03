import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "./admin/components/wrapper/Header";

function SingleSearch({ data }) {
  let search = data;
  if (
    data.length > 0
  )
  return (
    <Wrapper
      className="notify rounded-2"
      style={{ height: "400px", overflowY: "scroll" }}
    >
      <div>
        {search
          ? search.map((data) => {
              return (
                <>
                  <Link
                  to={`/profiles/${data.user._id}`}

                  >
                    <div
                      id="shownotification"
                      className="d-flex shadow-sm aligin-items-center w-100 gap-2 notify-items m-1"
                    >
                      <img
                        src={data.avatar}
                        alt=""
                        srcset=""
                        width={70}
                        height={70}
                      />
                      <p>
                        {data.name} <br />
                        {data.email}
                      </p>
                      <div
                        className="position-relative notify-edit mt-4  d-flex flex-column text-nowrap ms-4 ps-2"
                        width={70}
                      ></div>
                    </div>
                  </Link>
                </>
              );
            })
          : null}
      </div>
    </Wrapper>
  );
}

export default SingleSearch;