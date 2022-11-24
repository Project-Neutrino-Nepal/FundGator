import "../css/basenav.css";
const Basenav = () => {
  return (
    <>
      <div className="container-sm-fluid " id="basenav">
        <div className="card " style={{ marginTop: "80px" }}>
          <div className="text-center p-1">
            <img
              src="https://cdn.dribbble.com/users/3293507/screenshots/14667603/media/d8cbe035a61f64afdf6deabca5182842.jpg?compress=1&resize=400x300&vertical=top"
              alt="profile"
              style={{ width: "120px", height: "90px", borderRadius: "70%" }}
            />
          </div>
          <div className="text-center">
            <div className="scrollmenu">
              <li><a href="#news">Feeds</a></li>
              <li><a href="#news">Feeds</a></li>
              <li><a href="#news">Feeds</a></li>

              {/* <a href="#news">Feeds</a>
              <a href="#contact">My Investment</a>
              <a href="#about">By Fundgator</a>
              <a href="#support">My Watchlist</a>
              <a href="#blog">Add Post</a>
              <a href="#tools">Raise Fund</a> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Basenav;
