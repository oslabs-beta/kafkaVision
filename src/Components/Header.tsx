import React, {useState} from 'react';

const Header = () => {
  return (
    // header
    <div className="bg-backgroundC-300 flex justify-between items-center h-15">

      {/* logo */}
      {/* <div className="justify-items-end py-5 px-3 font-bold text-textC-100/75 text-3xl">kafkavision</div> */}
      <div className="justify-items-end py-5 px-3 text-textC-100/90  font-bold bg-gradient-to-r from-buttonC-200 via-backgroundC-200 to-backgroundC-300 text-3xl">kafkavision</div>


      {/* github button */}
      <div className="flex justify-right">
        <a href="https://github.com/oslabs-beta/kafkavision" className="py-1.5 px-3 mr-3 bg-buttonC-300 hover:bg-buttonC-200 text-textC-100 text-base rounded shadow hover:text-backgroundC-200 transition duration-300">Github</a> 
        {/* dark mode toggle button  */}
      </div>  
    </div>
    
  )
};

export default Header;