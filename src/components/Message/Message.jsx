import { Avatar } from "@mui/material";
import "./Message.css";

function Message({ timestamp, message, user }) {
  const ISTtimestamp = new Date(timestamp?.toDate()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  return (
    <div className="message">
      <Avatar src={user?.photo} />
      <div className="message-info">
        <h4>
          {user?.displayName}
          <span className="message-timestamp">{ISTtimestamp}</span>
        </h4>
        <p className="actual-message">{message}</p>
      </div>
    </div>
  );
}

export default Message;