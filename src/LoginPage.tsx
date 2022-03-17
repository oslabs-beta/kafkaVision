import React from 'react';
import { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(' ');
  const history = useHistory();

  const handleUsernameInput = (event:any) => {
    setUsername(event.target.value);
  };

  const handlePasswordInput = (event:any) => {
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
      .then(
        (user) => {
          // After your login action you can redirect with this command:
          history.push('/connectCluster');
        },
        (error) => {
          setStatus(
            'An error occured. Please check your credentials and try again.'
          );
          console.log(error);
        }
      );
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
    <div className=" h-screen">
      {/* <div> Login Page! </div> */}
      <div className="text-white">
        <Link to="/connectCluster"> Go Inside... </Link>
        {/* <Link to="/health"> Health Metrics Page...   </Link>
                <Link to="/componentRelationships"> Component Relationships Page...   </Link> */}
      </div>

      <div className='bg-darkBlue/80 m-5 border rounded border-limeGreen/70'>
        <div className="bg-clip-text text-transparent py-4 px-3 bg-gradient-to-r from-slateBlue via-seafoam/75 to-slateBlue text-7xl font-black text-center font-logo">kafkaVision</div>
        <div className="relative flex items-center justify-center m-3">
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
              type="text"
              placeholder="password"
              name="password"
              value={password}
            ></input>
            <span>
          
              <button
                className='h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50'
                onClick={() => {
                  login(username, password);
                  setUsername('');
                  setPassword('');
                }}
              >
                Log in
              </button>
              <button
                className='h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50'
                onClick={() => {
                  signup(username, password);
                  setUsername('');
                  setPassword('');
                }}
              >
                Register
              </button>
            </span>
          </form>
          {/* <<div className="flex bg-orange-500 w-50 h-50">
                      <div className="bg-blue-400 w-20 h-20"> Username </div>
                      <div className="bg-orange-400 w-20 h-20"> Password </div>
                  </div>> */}
          <br /><span>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
