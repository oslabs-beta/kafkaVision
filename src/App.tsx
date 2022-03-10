import { hot } from "react-hot-loader/root";
import * as React from 'react';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header'



interface Props {
   name:
    string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <div className="bg-yellow">
        <div className="text-2xl text-white bg-black">
          <Header/>
        </div>
        <div className="flex text-white bg-red">
          <Sidebar/>   
        </div>
      </div>
    );
  }
}

export default hot(App);