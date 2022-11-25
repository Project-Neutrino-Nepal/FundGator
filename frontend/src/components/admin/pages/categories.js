import ai from "../../../assets/image/ai.png";
const Catogries = () => {
  return (
    <>
      <div className="container" style={{ marginTop: 100 }}>
        <div className="row d-block shadow p-3 ">
          <h4>Categories</h4>
        </div>

        <div className="mt-5 p-2 col-sm-10 d-flex flex-wrap justify-content-evenly ">
          <div className="card col-sm-6" style={{ width: "400px" }}>
            <img
              className="card-img-top"
              src={ai}
              alt="Card image"
              style={{ width: "100%" }}
            />
            <div className="card-body text-center">
              <a href="#" className="btn btn-primary">
                AI
              </a>
            </div>
          </div>
          <div className="card col-sm-6" style={{ width: "400px" }}>
            <img
              className="card-img-top"
              src={ai}
              alt="Card image"
              style={{ width: "100%" }}
            />
            <div className="card-body text-center">
              <a href="#" className="btn btn-primary">
                Entertainment
              </a>
            </div>
          </div>
          <div className="card col-sm-6" style={{ width: "400px" }}>
            <img
              className="card-img-top"
              src={ai}
              alt="Card image"
              style={{ width: "100%" }}
            />
            <div className="card-body text-center">
              <a href="#" className="btn btn-primary">
                Retail
              </a>
            </div>
          </div>
          <div className="card col-sm-6" style={{ width: "400px" }}>
            <img
              className="card-img-top"
              src={ai}
              alt="Card image"
              style={{ width: "100%" }}
            />
            <div className="card-body text-center">
              <a href="#" className="btn btn-primary">
                E-commerce
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Catogries;
