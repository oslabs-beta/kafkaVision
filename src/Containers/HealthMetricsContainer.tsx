import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import HealthMetricsChart from '../chartComponents/HealthMetricsChart';
import { appContext } from '../App';

const HealthMetricsContainer = () => {
  //UNPACK APP STATE TO GET PROMETHEUS URL
  const {
    state: { connectionState },
    actions: { setGlobalState },
  } = useContext(appContext);

  const queryParams = 'api/v1/query?query=';
  const queryLink = connectionState.url_prometheus + queryParams;
  const connectionStatus = connectionState.isConnected; // semantic variable

  // LOCAL STATE
  const [topics, setTopics] = useState(0);
  const [controllers, setControllers] = useState(0);
  const [brokers, setBrokers] = useState(0);
  const [partitions, setPartitions] = useState(0);
  const [underReplicated, setUnderReplicated] = useState(0);
  const [offlinePartitions, setOfflinePartitions] = useState(0);

  //CONTROLLERS
  useEffect(() => {
    //active controllers query
    const query = 'kafka_controller_kafkacontroller_activecontrollercount';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        // console.log('CONTROLLERS QUERY DATA: ', result);
        // console.log('CHECKING VALUE: ', result.data.result[0].value[1]);
        setControllers(result.data.result[0].value[1]);
      })
      .catch((err) => {
        console.log('ERROR IN CONTROLLERS USEEFFECT: ', err);
      });
  }, [controllers]);

  //BROKERS
  useEffect(() => {
    //brokers online query
    const query = 'count(kafka_server_replicamanager_leadercount)';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        // console.log('BROKERS QUERY DATA: ', result);
        // console.log('CHECKING VALUE: ', result.data.result[0].value[1]);
        setBrokers(result.data.result[0].value[1]);
      })
      .catch((err) => {
        console.log('ERROR IN BROKERS USEEFFECT: ', err);
      });
  }, [brokers]);

  //PARTITION COUNT
  useEffect(() => {
    const query = 'sum(kafka_controller_kafkacontroller_globalpartitioncount)';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        // console.log('PARTITION COUNT QUERY: ', result);
        setPartitions(result.data.result[0].value[1]);
      })
      .catch((err) => {
        console.log('ERROR IN PARTITION COUNT USEEFFECT: ', err);
      });
  }, [partitions]);

  //TOPIC COUNT
  useEffect(() => {
    const query = 'sum(kafka_controller_kafkacontroller_globaltopiccount)';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        // console.log('TOPICS COUNT QUERY: ', result);
        setTopics(result.data.result[0].value[1]);
      })
      .catch((err) => {
        console.log('ERROR IN TOPICS COUNT USEEFFECT: ', err);
      });
  }, [topics]);

  //TOPICS DROP DOWN MENU
  const options = [];
  for (let i = 1; i <= topics; i += 1) {
    options.push(
      <option value="topic{i}" key={i}>
        {' '}
        Topic {i}{' '}
      </option>
    );
  }

  //UNDERREPLICATED PARTITIONS
  useEffect(() => {
    const query = 'sum(kafka_server_replicamanager_underreplicatedpartitions)';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        // console.log('UNDER REPLICATED PARTITIONS QUERY: ', result);
        setUnderReplicated(result.data.result[0].value[1]);
      })
      .catch((err) => {
        console.log('ERROR IN UNDER REPLICATED PARTITIONS USEEFFECT: ', err);
      });
  }, [underReplicated]);

  //OFFLINE PARTITIONS COUNT
  useEffect(() => {
    const query =
      'sum(kafka_controller_kafkacontroller_offlinepartitionscount)';
    fetch(queryLink + query)
      .then((data) => data.json())
      .then((result) => {
        // console.log('OFFLINE PARTITIONS QUERY: ', result);
        setOfflinePartitions(result.data.result[0].value[1]);
      })
      .catch((err) => {
        console.log('ERROR IN OFFLINE PARTITIONS USEEFFECT: ', err);
      });
  }, [offlinePartitions]);

  let renderedContent: any;
  if (connectionStatus === false) {
    renderedContent = (
      <div className="flex-auto justify-center text-fontGray/75">
        <div className="m-10 rounded bg-backgroundC-400 text-fontGray/75 text-2xl">
          Please Connect to your{' '}
          <Link
            className="text-slate-100 font-bold"
            to="/connectCluster"
            onClick={() =>
              setGlobalState((prevState: any) => {
                return { ...prevState, sidebarTab: 0 };
              })
            }
          >
            Cluster
          </Link>{' '}
          to see this page
        </div>
      </div>
    );
  } else {
    renderedContent = (
      <div className="text-xl text-center height-max m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75 font-bold">
        <h2 className="m-4 text-center">Health Dashboard</h2>
        <div className="border-2 border-seafoam/40 rounded m-5 grid grid-rows-2  bg-slateBlue/50">
          {/* Overall Cluster Health */}
          <div className="rounded m-5 border border-fontGray/50 bg-zinc-800">
            <p className="m-3">Overall Cluster Health</p>
            <div className="flex items-center justify-center m-8">
              <HealthMetricsChart />
            </div>
          </div>

          {/* Topic Metrics */}
          <div className="border border-slateBlue rounded m-5 bg-zinc-800">
            <p className="m-5">Topic Metrics</p>

            {/* Drop Down Menu way down below!*/}

            {/* List of metrics */}
            <div className="grid grid-cols-3  rounded gap-5 p-5 text-sm font-light divide-fontGray/50">
              <div className="bg-slateBlue/70 p-5 rounded border border-fontGray/50">
                <div className="text-xs text-seafoam/70 font-bold">
                  Global Topic Count:{' '}
                </div>
                <div className="text-7xl text-limeGreen/80">{topics} </div>
              </div>

              <div className="bg-slateBlue/70 p-5 rounded border ">
                <div className="text-xs text-seafoam/70 font-bold">
                  Global Online Partitions:{' '}
                </div>
                <div className="text-7xl text-limeGreen/80">{partitions} </div>
              </div>

              <div className="bg-slateBlue/70 p-5 rounded border">
                <div className="text-xs text-seafoam/70 font-bold">
                  Active Controllers:{' '}
                </div>
                <div className="text-7xl text-limeGreen/80">{controllers} </div>
              </div>

              <div className="bg-slateBlue/70 p-5 rounded border">
                <div className="text-xs text-seafoam/70 font-bold">
                  Brokers Online:{' '}
                </div>
                <div className="text-7xl text-limeGreen/80">{brokers} </div>
              </div>

              <div className="bg-slateBlue/70 p-5 rounded border">
                <div className="text-xs text-seafoam/70 font-bold">
                  Under Replicated Partitions:{' '}
                </div>
                <div className="text-7xl text-limeGreen/80">
                  {underReplicated}{' '}
                </div>
              </div>

              <div className="bg-slateBlue/70 p-5 rounded border">
                <div className="text-xs text-seafoam/70 font-bold">
                  Offline Partitions:{' '}
                </div>
                <div className="text-7xl text-limeGreen/80">
                  {offlinePartitions}{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-auto justify-center">
      {renderedContent}
      {/* <div className="font-bold text-xl text-center height-max m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-fontGray/75"> 
        <h2 className="m-4 text-center">Health Dashboard</h2>
          <div className="border-2 border-seafoam/40 rounded m-5 grid grid-rows-2  bg-slateBlue/50"> */}

      {/* Overall Cluster Health */}
      {/* <div className='rounded m-5 border border-slateBlue bg-zinc-800'>
              <p className='m-3'>Overall Cluster Health</p>
              <div className='flex items-center justify-center m-8'>
               <HealthMetricsChart/>
              </div>
            </div> */}

      {/* Topic Metrics */}
      {/* <div className='border border-slateBlue rounded m-5 bg-zinc-800'>
              <p className='m-3'>Topic Metrics</p> */}

      {/* Drop Down Menu way down below */}

      {/* List of metrics */}
      {/* <ul className='bg-buttonC-300 rounded my-2 p-4 text-sm font-light divide-y-2 divide-fontGray/50'> */}
      {/* text placeholders */}
      {/* <li>Global Topic Count: {topics}</li>
                  <li>Global Online Partitions: {partitions} </li>
                  <li>Active Controllers: {controllers}</li>
                  <li>Brokers Online: {brokers}</li>
                  <li>Under Replicated Partitions: {underReplicated}</li>
                </ul>
               
            </div>
          </div>
      </div>  */}
    </div>
  );
};

export default HealthMetricsContainer;

{
  /* <div className='text-sm text-left mx-5'>
<p>Please Select a Topic:</p>
<select className='my-1 bg-zinc-900 border rounded border-slateBlue' name="topic" id="topic">
  {/* <option value="topic1"> Topic 1 </option>
  <option value="topic2"> Topic 2 </option>
  <option value="topic3"> Topic 3 </option> */
}
//   {options}
// </select> */}
