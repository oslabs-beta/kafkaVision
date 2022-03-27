//import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// IMPORTED COMPONENTS/PAGES ----------------------------------
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import HealthMetricsContainer from './Containers/HealthMetricsContainer';
import RelationshipsContainer from './Containers/RelationshipsContainer';
import ConnectClusterPage from './ConnectClusterPage';
import LoginPage from './LoginPage';
import fakeState from './Components/dummyState';
const { dummyGlobalState, dummyConnectionState } = fakeState;
// ------------------------------------------------------

// interface Props {
//   name: string;
// }
export const appContext = createContext(fakeState); // Best to initialize with null?

const App = () => {
  const [globalState, setGlobalState] = useState(dummyGlobalState);
  const [connectionState, setConnectionState] = useState(dummyConnectionState);

  const providerProps: any = {
    state: { globalState, connectionState},
    actions: {setGlobalState, setConnectionState},
  };

  return (
    <div>
      <BrowserRouter>
        <div>
          {/* remove this div?*/}
          <appContext.Provider value={providerProps}>
            <div className="text-2xl text-fontGray-75 bg-zinc-900">
              <Header />
            </div>
            <Switch>
              <Route exact path="/">
                <LoginPage />
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
