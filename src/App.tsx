//import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import HealthMetricsContainer from './Containers/HealthMetricsContainer';
import RelationshipsContainer from './Containers/RelationshipsContainer';
import TopicsContainer from './Containers/TopicsContainer';
import ConnectClusterPage from './ConnectClusterPage';
import LoginPage from './LoginPage';
import LandingPage from './LandingPage'
import initialState from './initialState';
const { dummyGlobalState, dummyConnectionState } = initialState;

//'initialState' holds all state in "pristine" status - before user interaction
export const appContext = createContext(initialState);

const App = () => {
  // packaging data from 'initialState' import into value for Provider context
  const [globalState, setGlobalState] = useState(dummyGlobalState);
  const [connectionState, setConnectionState] = useState(dummyConnectionState);
  const providerProps: any = {
    state: { globalState, connectionState },
    actions: { setGlobalState, setConnectionState },
  };
  
  // all elements wrapped in BrowserRouter & appContext
  // sidebar contains links to switch between <Routes> below
  return (
    <div>
      <BrowserRouter>
        <div>
          <appContext.Provider value={providerProps}>
            <div className="text-2xl text-fontGray-75 bg-zinc-900">
              <Header />
            </div>
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>

              <Route exact path="/connectCluster">
                <div className="grid grid-cols-6 h-screen">
                  <div className="flex col-span-1">
                    <Sidebar />
                  </div>
                  <div className="col-span-5 bg-gray-900">
                    <ConnectClusterPage />
                  </div>
                </div>
              </Route>

              <Route exact path="/health">
                <div className="bg-zinc-900 grid grid-cols-6 h-screen">
                  <div className="flex col-span-1">
                    <Sidebar />
                  </div>
                  <div className="col-span-5 bg-gray-900">
                    <HealthMetricsContainer />
                  </div>
                </div>
              </Route>

              <Route exact path="/topicMetrics">
                <div className="grid grid-cols-6 h-screen">
                  <div className="flex col-span-1">
                    <Sidebar />
                  </div>
                  <div className="col-span-5 bg-gray-900">
                    <TopicsContainer />
                  </div>
                </div>
              </Route>

              <Route exact path="/componentRelationships">
                <div className="grid grid-cols-6 h-screen">
                  <div className="flex col-span-1">
                    <Sidebar />
                  </div>
                  <div className="col-span-5 bg-gray-900">
                    <RelationshipsContainer />
                  </div>
                </div>
              </Route>
            </Switch>
          </appContext.Provider>
        </div>
      </BrowserRouter>
    </div>
  );
  // }
};

export default App;
