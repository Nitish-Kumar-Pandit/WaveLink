import './Sidebar.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SidebarChannel from './SidebarChannel';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CallIcon from '@mui/icons-material/Call';
import { Avatar } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';
import { auth, db } from '../../firebase';
import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';


function Sidebar() {

  const user = useSelector(selectUser)
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const channelsCollection = collection(db, "channels");
    onSnapshot(channelsCollection, (snapshot) => {
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  });

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      const channelsCollection = collection(db, "channels");
      addDoc(channelsCollection, {
        channelName: channelName
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h3>WaveLink</h3>
        <LogoutIcon className='logout-button'
        onClick={() => {
          console.log('Logout button clicked!');
          auth.signOut();
        }}
        />
      
      </div>
      <div className="sidebar-channel">
        <div className="sidebar-channelheader">
          <div className="sidebar-header">
            <ExpandMoreIcon/>
            <h4>CHANNELS</h4>
          </div>
            <AddIcon onClick={handleAddChannel} className='sidebar-add-icon'/>
        </div>
      <div className="sidebar-channel-list">
        {channels.map(({ id, channel }) => (
          <SidebarChannel key={id} id={id} channelName={channel.channelName}/>
        ))}
      </div>
      </div>
      <div className="sidebar-voice">
        <SignalCellularAltIcon
          className='sidebar-voiceIcon'
          fontSize='large'
        />
        <div className="sidebar-voiceInfo">
          <h3>Chat Connected</h3>
          <p>Stream</p>
        </div>
        <div className='sidebar-voiceIconsss'>
          <InfoOutlinedIcon/>
          <CallIcon/>
        </div>
      </div>
      <div className="sidebar-profile">
        <Avatar src= {user.photo}/>
        <div className="sidebar-profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid?.substring(0, 5)}</p>
        </div>
        <div className="sidebar-profileIcons">
          <MicIcon/>
          <HeadphonesIcon/>
          <SettingsIcon/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
