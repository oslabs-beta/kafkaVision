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
        <div className="bg-yellow"> {/* remove this div?*/}
          <div className="text-2xl text-white bg-black">
            <Header/>
          </div>

          <Switch> 
            <Route exact path='/'> {/* is it best for this to be the homepage "/" ? */}
              <LoginPage/>
            </Route>

            <Route exact path='/connectCluster'>
              <ConnectClusterPage/>
            </Route>

            <Route exact path='/health'>
              <div className="flex text-white">
                <Sidebar/>
              </div>
              <HealthMetricsContainer/>
            </Route>

            <Route exact path='/componentRelationships'>
            <div className="flex text-white">
                <Sidebar/>
              </div>
              <RelationshipsContainer/>
            </Route>
          </Switch>


        </div> {/* remove this div?*/}

      </BrowserRouter>
    );
  }
}

export default hot(App);