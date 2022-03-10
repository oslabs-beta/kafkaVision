import { hot } from "react-hot-loader/root";
import * as React from 'react';
import Sidebar from './Components/Sidebar'

interface Props {
   name:
    string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1 className="text-4xl text-white bg-black">
          Hello {name}
        </h1>

        <div className="flex">
          <Sidebar/>
        </div>

      </>
    );
  }
}

export default hot(App);