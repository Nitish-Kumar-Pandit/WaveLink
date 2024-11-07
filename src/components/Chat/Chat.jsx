import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Message from "./../Message/Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../redux/appSlice";
import { selectUser } from "../../redux/userSlice";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, doc, query, orderBy, setDoc, onSnapshot, Timestamp  } from 'firebase/firestore';

function Chat() {
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const channelId = useSelector(selectChannelId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      const channelRef = doc(db, "channels", channelId);
      const messagesQuery = query(collection(channelRef, "messages"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const messages = snapshot.docs.map((doc) => doc.data());
        setMessages(messages);
      });
      return () => unsubscribe();
    }
  }, [channelId]);
  

  const sendMessages = (e) => {
    e.preventDefault();
    const messagesCollection = collection(db, "channels", channelId, "messages");
    setDoc(doc(messagesCollection), {
      timestamp: Timestamp.now(),
      user: user,
      message: input
    });
    setInput("");
  }

  return (
    <div className="chat">
      <ChatHeader />
      <div className="chat-messages">
        {messages.map(( message, id) => (
          <Message
          timestamp={message.timestamp}
          message={message.message}
          user={message.user}
          key={id}
          />
        ))}
  
      </div>

      <div className="chat-input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            disabled={!channelId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button onClick={sendMessages} className="chat-input-button" type="Submit">
            Send
          </button>
        </form>
        <div className="chat-input-icons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
