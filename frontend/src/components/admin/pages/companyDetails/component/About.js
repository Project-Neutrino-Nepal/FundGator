import React,{useState} from "react";
const About = () => {
    const option = {
      citizenfront:
        "https://upload.wikimedia.org/wikipedia/commons/0/0c/Chinese_Service_E-Passport_Passport_Personal_Info_Page.jpg",
      citizenback:
        "https://i.insider.com/5e1f671b49878c169c0ece03?width=1000&format=jpeg&auto=webp",
      registration:
        "https://upload.wikimedia.org/wikipedia/commons/7/79/Californian_sample_driver%27s_license%2C_c._2019.jpg",
      pancard: "https://pbs.twimg.com/media/FEssc4TVkAY9JhH.png",
    };
    const [previews, setPreview] = useState(option);
    const [modalimg, setModal] = useState({
        title:"",
        img:"",
    });


  return (
    <div className="border border-2 p-2 mb-5">
      <h3 className="text-center"> Documents</h3>
      <div className="d-flex gap-3">
        <div className="citizen position-relative">
          <img
            src={previews.citizenfront}
            alt=""
            height={200}
            className="w-100"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
          <button
            className="postion-absolute top-0 start-0 w-100 border-0 fw-bold"
            height={60}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              setModal({
                title: "CitizenShip Front",
                img: previews.citizenfront,
              })
            }
          >
            View fullscreen
          </button>
        </div>
        <div className="citizen position-relative">
          <img
            src={previews.citizenback}
            alt=""
            height={200}
            className="w-100"
          />
          <button
            className="postion-absolute top-0 start-0 w-100 border-0 fw-bold"
            height={60}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              setModal({
                title: "CitizenShip Back",
                img: previews.citizenback,
              })
            }
          >
            View Fullscreen
          </button>
        </div>
      </div>
      <div className="d-flex gap-3 mt-3">
        <div className="citizen position-relative">
          <img
            src={previews.registration}
            alt=""
            height={200}
            className="w-100"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />
          <button
            className="postion-absolute top-0 start-0 w-100 border-0 fw-bold"
            height={60}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              setModal({
                title: "Registration Card",
                img: previews.registration,
              })
            }
          >
            View Fullscreen
          </button>
        </div>
        <div className="citizen position-relative">
          <img src={previews.pancard} alt="" height={200} className="w-100" />
          <button
            className="postion-absolute top-0 start-0 w-100 border-0 fw-bold"
            height={60}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() =>
              setModal({
                title: "PAN CARD",
                img: previews.pancard,
              })
            }
          >
            View Fullscreen
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalimg.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <img
                src={modalimg.img}
                alt=""
                srcset=""
                className="w-100 h-100"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
