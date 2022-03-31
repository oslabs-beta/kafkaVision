/// <reference path='../../custom.d.ts'/>
import React, { useContext } from 'react';
import { appContext } from '../App';
import disconnected_icon from '../../public/images/no-plug.png';

const Header = () => {
  //unpack state for connection status
  const {
    state: { connectionState, globalState },
  } = useContext(appContext);

  return (
    <div role="banner" className="bg-darkIndigo/70 flex justify-between items-center h-15">
      <div className="bg-clip-text text-transparent py-4 px-3 bg-gradient-to-r from-slateBlue via-seafoam/75 to-slateBlue text-5xl font-black text-justify font-logo">
        kafkaVision
      </div>
      <div className="flex justify-right justify-between">
        <div className="flex flex-col">
          {/* 3 connection icons below with hover description (conditionally rendered) */}
          {(connectionState.isConnected && connectionState.valid_prom_url) && (
            <div className="flex flex-row items-center group">
              <span className="text-xs mr-4 scale-0 bg-green-700 px-2 text-white group-hover:scale-100 rounded">
                Connected with Prometheus
              </span>
              <div className="bg-limeGreen/80 rounded-full mr-3 text-xs p-2">
                PC
              </div>
            </div>
          )}
          {(connectionState.isConnected && connectionState.valid_kafka_url) && (
            <div className="flex flex-row items-center group">
              <span className="text-xs mr-4 scale-0 bg-green-700 px-2 text-white group-hover:scale-100 rounded">
                Connected with KafkaJS
              </span>
              <div className="bg-limeGreen/80 rounded-full mr-3 text-xs p-2">
                KC
              </div>
            </div>
          )}
        </div>
        {!connectionState.isConnected && (
          <div className="flex flex-row items-center group">
            <span className="text-sm mr-4 scale-0 bg-red-700 px-2 text-white group-hover:scale-100 rounded">
              Not Connected
            </span>
            <div className="bg-seafoam/80 rounded-3xl mr-3">
              <img src={disconnected_icon}></img>
            </div>
          </div>
        )}
        {/* github button */}
        <a href="https://github.com/oslabs-beta/kafkavision">
          <button 
            role="button"
            className="py-1.5 px-4 mr-3 bg-seafoam/80 hover:bg-darkIndigo/50 text-darkIndigo text-base border border-white/50 rounded drop-shadow hover:text-seafoam/75 transition-all duration-300 align-center">
              Github
          </button>
          
        </a>
      </div>
    </div>
  );
};

export default Header;
