//import { hot } from 'react-hot-loader/root';
import * as React from 'react'; // GET HELP WITH THIS
// const {useState} = React;
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// IMPORTED COMPONENTS/PAGES ----------------------------------
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import HealthMetricsContainer from './Containers/HealthMetricsContainer';
import RelationshipsContainer from './Containers/RelationshipsContainer';
import ConnectClusterPage from './ConnectClusterPage';
import LoginPage from './LoginPage';
import dummyState from './Components/dummyState';
// ------------------------------------------------------

// interface Props {
//   name: string;
// }
export const globalStateContext = React.createContext(dummyState); // Best to initialize with null?

const App = () => {//extends React.Component<Props> {
  // render() {
  //   console.log('react below');
  //   console.log(React.useState);
  //   const { name } = this.props; // leftover code
  //   const selected = 1;

    const [globalState, setGlobalState] = React.useState(dummyState);
    // const context = { globalState, setGlobalState}; // needs to be in single object to pass down as context's value?

    return (
      <div>
      <BrowserRouter>
        <div> {/* remove this div?*/}
          <div className="text-2xl text-fontGray-75 bg-zinc-900">
            <Header/>
          </div>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>

            <Route exact path="/connectCluster">
              <div className="grid grid-cols-6 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-zinc-900">
                    <ConnectClusterPage/>
                  </div>
                </div>
              </Route>
              <globalStateContext.Provider value={{globalState, setGlobalState}}>
              {/* <Route exact path='/health'>
                <div className="grid grid-cols-6 bg-red-900 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-zinc-900">
                    <HealthMetricsContainer/>
                  </div>
                </div>
            </Route> */}

            <Route exact path="/health">
              <div className="bg-zinc-900 grid grid-cols-6 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-white">
                    <HealthMetricsContainer />
                  </div>
              </div>
                
            </Route>

            <Route exact path="/componentRelationships">
              <div className="grid grid-cols-6 h-screen">
                <div className="flex text-white bg-blue-400 col-span-1">
                  <Sidebar />
                </div>
                <div className="col-span-5 bg-white">
                  <RelationshipsContainer />
                </div>
              </div>
            </Route>
            </globalStateContext.Provider>
          </Switch>
        </div>
      </BrowserRouter>
      </div>
    );
  // }
}

export default App;
