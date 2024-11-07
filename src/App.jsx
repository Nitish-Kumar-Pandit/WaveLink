import Sidebar from './components/Sidebar/Sidebar';
import './App.css'
import Chat from './components/Chat/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './redux/userSlice';
import { Login } from './components/Login/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import {login , logout} from './redux/userSlice';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(() => {
  auth.onAuthStateChanged((authUser) => {
    console.log('authUser:', authUser)
    if (authUser) {
      // user is logged in
      dispatch(login({
        uid: authUser.uid,
        photo: authUser.photoURL,
        email: authUser.email,
        displayName: authUser.displayName
      }))
    } else {
      // user is logged out
      dispatch(logout())
    }
  })
}, [dispatch])
  return (
    <div>
    {user ? (
      <div className='app'>
        <Sidebar/>
        <Chat/>
      </div>
      ) : (<Login/>) }
    </div>
  )
}

export default App
