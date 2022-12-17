import "./message.css";
//import { format } from "timeago.js";
import moment from 'moment'

export default function Message({ message, own }) {
  return (
    <>
      {own ? (
        <div className="message own">
          <div className="messageTop">
            <p className="messageText">{message.text}</p>
          </div>
          <div className="messageBottom">{moment(message.createdAt)}</div>
        </div>
      ) : (
        <div className="message">
          <div className="messageTop">
            <img
              className="messageImg"
              src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-21.jpg"
              alt=""
            />
            <p className="messageText">{message.text}</p>
          </div>
          <div className="messageBottom">{moment(message.createdAt)}</div>
        </div>
      )}
    </>
  );
}
