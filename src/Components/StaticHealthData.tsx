import React, { useEffect, useState, useContext } from 'react';
import { appContext } from '../App';

const StaticHealthData = () => {
    // Unpack state from provider context
    const {
        state: { connectionState },
      } = useContext(appContext);

    const queryParams = 'api/v1/query?query='; 
    const queryLink = connectionState.url_prometheus + queryParams;
    const connectionStatus = connectionState.isConnected

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

    return (
        <div className='border border-slateBlue rounded m-5 bg-zinc-800'>
            <p className='m-5'>Topic Metrics</p>

            {/* List of metrics */}
            <div className="grid grid-cols-3 rounded gap-5 p-5 text-sm font-light divide-fontGray/50">
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
    )
    
};


export default StaticHealthData;
