import "../css/basenav.css";
const Basenav = ({ user }) => {
  return (
    <>
      <div className="container-sm-fluid " id="basenav">
        <div className="card " style={{ marginTop: "60px" }}>
          <div className="text-center p-1">
            <img
              src={user}
              alt="profile"
              height={100}
              width={100}
            />
          </div>
          <div className="text-center">
            <div className="scrollmenu">
              <a href="#feeds">Feeds</a>
              <a href="#investment">My Investment</a>
              <a href="#fundgator">By Fundgator</a>
              <a href="#watchlist">My Watchlist</a>
              <a href="#poost">Add Post</a>
              <a href="#raisefund">Raise Fund</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Basenav;
