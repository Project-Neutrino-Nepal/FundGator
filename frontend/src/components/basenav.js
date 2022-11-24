import "../css/basenav.css";
const Basenav = () => {
  return (
    <>
      <div className="container-sm-fluid " id="basenav">
        <div className="card " style={{ marginTop: "60px" }}>
          <div className="text-center p-1">
            <img
              src="https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg?compress=1&resize=400x300&vertical=top"
              alt="profile"
              style={{ width: "120px", height: "90px", borderRadius: "70%" }}
            />
          </div>
          <div className="text-center">
            <div className="scrollmenu">
              <a href="#feeds">Feeds</a>
              <a href="#investment">My Investment</a>
              <a href="#fundgator">By Fundgator</a>
              <a href="#watchlist">My Watchlist</a>
              <a href="#post">Add Post</a>
              <a href="#raisefund">Raise Fund</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Basenav;
