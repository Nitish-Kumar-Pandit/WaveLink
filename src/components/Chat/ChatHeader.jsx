import "./ChatHeader.css";
import NotificationsIcon from '@mui/icons-material/Notifications';
import EditLocationRoundedIcon from '@mui/icons-material/EditLocationRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import { selectChannelName } from "../../redux/appSlice";
import { useSelector } from "react-redux";
function ChatHeader() {

  const channelName = useSelector(selectChannelName);

  return (
    <div className="chat-header">
      <div className="chat-header-left">
        <h3>
          <span className="chat-header-hash">#</span>
        {channelName}
        </h3>
      </div>
      <div className="chat-header-right">
        <NotificationsIcon/>
        <EditLocationRoundedIcon/>
        <PeopleAltRoundedIcon/>
        <div className="chat-header-search">
            <input placeholder="Search" />
            <SearchRoundedIcon/>
        </div>
            <SendRoundedIcon/>
            <HelpRoundedIcon/>
      </div>
    </div>
  );
}

export default ChatHeader;
