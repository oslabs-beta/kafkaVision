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
          <div className="text-2xl text-fontGray-75 bg-zinc-900">
            <Header/>
          </div>

            <Switch> 
              <Route exact path='/'> 
                <LoginPage/>
              </Route>

              <Route exact path='/connectCluster'>
              <div className="grid grid-cols-6 bg-red-900 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-zinc-900">
                    <ConnectClusterPage/>
                  </div>
                </div>
              </Route>

              <Route exact path='/health'>
                <div className="grid grid-cols-6 bg-red-900 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-zinc-900">
                    <HealthMetricsContainer/>
                  </div>
                </div>
              </Route>

              <Route exact path='/componentRelationships'>
              <div className="grid grid-cols-6 bg-red-900 h-screen">
                  <div className="flex text-white bg-blue-400 col-span-1">
                    <Sidebar/>
                  </div>
                  <div className="col-span-5 bg-zinc-900">
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