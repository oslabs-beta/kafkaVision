import React, { useState, useContext } from 'react';
import { appContext } from '../App';
import { Link } from 'react-router-dom';
import connected_icon from '../../public/images/connected_icon.png';
import disconnected_icon from '../../public/images/no-plug.png';

const Header = () => {
  const appState = useContext(appContext);
  const [globalState, setGlobalState] = appState.global;
  const [connectionState, setConnectionState] = appState.connection;
  // console.log(globalState)
  // console.log(connectionState)

  let connection_image: any = '';
  if (globalState.isLoggedIn && !connectionState.isConnected) {
    // console.log("should be unplugged")
    connection_image = (
      <div className="flex flex-row items-center group">
        <span className="text-sm mr-4 scale-0 bg-red-700 px-2 text-white group-hover:scale-100 rounded">
          Not Connected
        </span>
        <div className="bg-seafoam/80 rounded-3xl mr-3">
          <img src={disconnected_icon}></img>
        </div>
      </div>
    );
  } else if (globalState.isLoggedIn && connectionState.isConnected) {
    // console.log("should be pluggedin")
    connection_image = (
      <div className="flex flex-row items-center group">
        <span className="text-sm mr-4 scale-0 bg-green-700 px-2 text-white group-hover:scale-100 rounded">
          Connected
        </span>
        <div className="bg-seafoam/80 rounded-3xl mr-3">
          <img src={connected_icon}></img>
        </div>
      </div>
    );
  }

  const logout: any = () => {
    // CORRECT FORMAT?
    console.log('logout fcn invoked');
    // send fetch request for cookie handling
    fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: globalState.id }),
    });
    // wipe all relevant state data
    setGlobalState((prevState: any) => {
      return {
        ...prevState,
        username: null,
        id: null,
        sidebarTab: 0,
        isLoggedIn: false,
        selectedState: 1,
      };
    });
    setConnectionState((prevState: any) => {
      return {
        ...prevState,
        url_prometheus: null,
        url_kafka: null,
        isConnected: false,
      };
    });
  };

  return (
    // header
    <div
      role="banner"
      className="bg-darkIndigo/70 flex justify-between items-center h-15"
    >
      {/* logo */}
      {/* <div className="justify-items-end py-5 px-3 font-bold text-textC-100/75 text-3xl">kafkavision</div> */}
      {/* <div className="justify-items-end py-5 px-3 text-textC-100/90 drop-shadow-md font-bold bg-backgroundC-400 text-3xl">kafkavision</div> */}
      <div className="bg-clip-text text-transparent py-4 px-3 bg-gradient-to-r from-slateBlue via-seafoam/75 to-slateBlue text-5xl font-black text-justify font-logo">
        kafkaVision
      </div>

      {/* github button */}
      <div className="flex justify-right">
        {/* // Credit FREEPIK for CONNECTED Icon in README */}
        {connection_image}
        <a
          role="button"
          href="https://github.com/oslabs-beta/kafkavision"
          className="py-1.5 px-3 mr-3 bg-seafoam/80 hover:bg-darkIndigo/50 text-darkIndigo text-base border border-white/50 rounded drop-shadow hover:text-seafoam/75 transition-all duration-300"
        >
          Github
        </a>
        <Link
          role="button"
          to="/"
          onClick={() => logout()}
          className="py-1.5 px-3 mr-3 bg-seafoam/80 hover:bg-darkIndigo/50 text-darkIndigo text-base border border-white/50 rounded drop-shadow hover:text-seafoam/75 transition-all duration-300"
        >
          Sign Out
        </Link>
        {/* dark mode toggle button  */}
      </div>
    </div>
  );
};

export default Header;
