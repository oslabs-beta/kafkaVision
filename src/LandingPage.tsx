import React from 'react';
import { useHistory } from 'react-router-dom';

const LandingPage = () => {
  const history = useHistory();

  function begin() {
    history.push('/connectCluster');
  }

  return (
    <div className=" h-screen bg-gray-900">
      <div className="bg-darkBlue/80 m-20 border rounded border-limeGreen/70">
        <div className="bg-clip-text text-transparent py-4 px-3 bg-gradient-to-r from-slateBlue via-seafoam/75 to-slateBlue text-7xl font-black text-center font-logo">
          kafkaVision
        </div>
        <div className="relative flex flex-col items-center justify-center m-1">
          <form
            className="relative flex flex-col items-center justify-center bg-slateBlue/70 rounded border border-seafoam/40 m-5"
            id="login box"
          >
            <p className="text-indigo-100 text-center p-4">
              Welcome to kafkaVision, a modern, intuitive GUI developed to make
              monitoring and making optimization decisions about your Apache
              Kafka cluster easier than ever. Inside, you'll find insights into
              the health metrics and status of your Brokers, Partitions, and
              Topics displayed in diagrams and living graphs.{' '}
            </p>
            <p className="text-indigo-100 text-center p-3">
              To get started, connect your running Kafka application by entering
              a port. kafkaVision establishes a connection with your application
              through a seedbroker's public port to diagram your topics,
              partitions, and offsets. Additionally, if you have Prometheus
              configured on your application, provide the URL to access key
              metrics like CPU and memory usage of your brokers.
            </p>
            <span>
              <button
                className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 hover:bg-limeGreen hover:text-slateBlue/80 rounded-lg focus:shadow-outline bg-limeGreen/50"
                onClick={() => {
                  begin();
                }}
              >
                Get Started
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
