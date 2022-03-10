import { hot } from "react-hot-loader/root";
import * as React from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header'
import HealthMetricsContainer from './Components/HealthMetricsContainer'
import {BrowserRouter, Route, Switch} from 'react-router-dom'


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

          <div className="flex text-white bg-red">
            <Sidebar/>
            {/* <HealthMetricsContainer/>    */}
          </div>
            
          </Switch>

        </div> {/* remove this div?*/}

      </BrowserRouter>
    );
  }
}

export default hot(App);