import "../../css/company_profile.css";
const ComProfile = () => {
  return (
    <>
      
        <div className="mt-5 container card col-6">
          <div className="card" style={{ width: 650 }}>
            <div className="card-body">
              <h4 className="card-title">John Doe</h4>
              <p className="card-text">
                Some example text some example text. John Doe is an architect
                and engineer
              </p>
              <img
              className="card-img-top"
              src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
              alt="Card image"
              style={{ width: "100%" }}
            /> 
            <br />
               <div><p>Location: Kathmandu, Nepal</p></div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ComProfile;
