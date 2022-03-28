import React from 'react';
import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { appContext } from './App';

const LoginPage = () => {
  // Unpack State
  const {
    actions: { setConnectionState, setGlobalState },
  } = useContext(appContext);
  const appState = useContext(appContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(' ');
  const history = useHistory();

  const handleUsernameInput = (event: any) => {
    setUsername(event.target.value);
  };

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  function login(username: String, password?: String) {
    fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((userInfo) => {
        // IF LOGIN ATTEMPT FAILED:
        if (userInfo.err) {
          console.log('error in login');
          setStatus(
            'Unable to recognize account. Please check your credentials and try again.'
          );
          return;
        }
        // IF IT WORKED, CHANGE STATE
        setGlobalState((prevState: any) => {
          return {
            ...prevState,
            username: userInfo.username,
            id: userInfo._id,
            isLoggedIn: true,
          };
        });
        setConnectionState((prevState: any) => {
          return {
            ...prevState,
            past_URLS_Prometheus: userInfo.prometheusClusters,
            past_URLS_Kafka: userInfo.kafkaCluster,
          };
        });
        // REDIRECT TO CONNECT PAGE
        history.push('/connectCluster');
      })
      .catch((error) => {
        // IF ERROR ON SERVER
        setStatus(
          'An error occured on the server. Please check your credentials and try again.'
        );
        console.log(error);
      });
  }

  function signup(username: String, password: String) {
    fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then(
        (user) => {
          setStatus('');
          //setGlobalState({isLoggedIn: true, user_id: `$user`})
        },
        (error) => {
          setStatus('Sorry, that username is already taken.');
          console.log(error);
        }
      );
  }

  return (
    <div className=" h-screen bg-gray-900">
      {/* //SECRET BUTTON */}
      <div className="text-white">
        <Link to="/connectCluster" className="text-slate-900">
          {' '}
          Back door...{' '}
        </Link>
      </div>
      {/* // OVERALL SECTION: */}
      <div className="bg-darkBlue/80 m-20 border rounded border-limeGreen/70">
        <div className="bg-clip-text text-transparent py-4 px-3 bg-gradient-to-r from-slateBlue via-seafoam/75 to-slateBlue text-7xl font-black text-center font-logo">
          kafkaVision
        </div>
        <div className="relative flex flex-col items-center justify-center m-3">
          {/* // LOGIN ERROR MESSAGE: */}
          <div className="text-red-500 bg-slate-300 max-w-xs border border-red-500 m-3 mb-0 text-center">
            {status}
          </div>
          {/* // LOGIN BOX: */}
          <form
            className="relative flex flex-col items-center justify-center bg-slateBlue/70 rounded border border-seafoam/40 m-5"
            id="login box"
          >
            <input
              onChange={handleUsernameInput}
              className="m-5 border rounded bg-slateBlue/70 border-limeGreen/80 text-limeGreen/80"
              type="text"
              placeholder="username"
              name="user"
              value={username}
            ></input>
            <input
              onChange={handlePasswordInput}
              className="m-4 border rounded bg-slateBlue/70 border-limeGreen/80 text-limeGreen/80"
              type="password"
              placeholder="password"
              name="password"
              value={password}
            ></input>
            {/* //LOGIN & REGISTER BUTTONS: */}
            <span>
              <button
                className="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50"
                onClick={(e) => {
                  e.preventDefault();
                  login(username, password);
                  setUsername('');
                  setPassword('');
                }}
              >
                Log in
              </button>
              <button
                className="h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50"
                onClick={(e) => {
                  e.preventDefault();
                  signup(username, password);
                  setUsername('');
                  setPassword('');
                }}
              >
                Register
              </button>
            </span>
          </form>
          {/* <br /><span>{status}</span> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
