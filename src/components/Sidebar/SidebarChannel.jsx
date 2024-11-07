import { useDispatch } from "react-redux";
import "./SidebarChannel.css";
import { setChannelInfo } from "../../redux/appSlice";

function SidebarChannel({ id, channelName }) {
  const dispatch = useDispatch();

  return (
    <div
      className="sidebar-channel"
      onClick={() => {
        dispatch(setChannelInfo({ channelId: id, channelName: channelName }));
      }}
    >
      <h4>
        <span className="sidebar-channel-hash">#</span>
        {channelName}
      </h4>
    </div>
  );
}

export default SidebarChannel;
