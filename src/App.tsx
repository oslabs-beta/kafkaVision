import { hot } from "react-hot-loader/root";
import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

// IMPORTED COMPONENTS/PAGES ----------------------------------
import Sidebar from './Components/Sidebar';
import Header from './Components/Header'
import HealthMetricsContainer from './Containers/HealthMetricsContainer'
import RelationshipsContainer from './Containers/RelationshipsContainer'
import ConnectClusterPage from './ConnectClusterPage'
import LoginPage from './LoginPage'
// ------------------------------------------------------

// TESTING DONUTCHART ------------------------------------------
 import HealthMetricsChart from './chartComponents/HealthMetricsChart';
// -------------------------------------------------

interface Props {
   name:
    string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <BrowserRouter>
        <div> {/* remove this div?*/}
          <div className="text-2xl text-white bg-black">
            <Header/>
          </div>

          {/* testing chartjs */}
          {/* <div className="h-32">
            <HealthMetricsChart/>
          </div> */}

            <Switch> 
              <Route exact path='/'> 
                <LoginPage/>
              </Route>

              <Route exact path='/connectCluster'>
              <div className="grid grid-cols-6 bg-red-900 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-white">
                    <ConnectClusterPage/>
                  </div>
                </div>
              </Route>

              <Route exact path='/health'>
                <div className="grid grid-cols-6 bg-red-900 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-white">
                    <HealthMetricsContainer/>
                  </div>
                </div>
              </Route>

              <Route exact path='/componentRelationships'>
              <div className="grid grid-cols-6 bg-red-900 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-white">
                    <RelationshipsContainer/>
                  </div>
                </div>
              </Route>
            </Switch>

        </div>

      </BrowserRouter>
    );
  }
}

export default hot(App);