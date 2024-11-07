import './Login.css';
import { auth, provider } from './../../firebase.js';
import { signInWithPopup } from 'firebase/auth';

function Login() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in:", result.user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="app-name">WaveLink</h1>
        <p className="login-title"> Implies seamless connection and conversation flow.</p>
        <button onClick={signInWithGoogle} className="google-signin-button">
          Sign In with Google
        </button>
      </div>
    </div>
  );
}

export {Login};
