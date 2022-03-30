import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  function begin() {
    history.push('/connectCluster');
  }

  return (
    <div className="h-screen bg-gray-900">
      <Link onClick={() => begin()} to="/connectCluster" className="text-white">
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;
