// interface CoreData {
//     producers: string[],
//     topic: string,
//     consumers: string[],
//     connectors: null,  
// }

// interface GlobalState {
//     username:string,
//     id:number,
//     sidebarTab:number,
//     isLoggedIn: boolean,
//     selected_kafka_topic_index:number,
//     kafka_topics: [string],
//     kafka_partitions:[string],
//     coreData: CoreData[]
// }

// interface ConnectionState {
//     url_prometheus: string,
//     url_kafka: string,
//     isConnected: boolean,
//     valid_prom_url: boolean,
//     valid_kafka_url:boolean,
// }

// interface AppContextInterface {
//     globalState: GlobalState,
//     connectionState: ConnectionState
// }

// interface AppContextInterface {
//     dummyGlobalState: {
//         username: string,
//         id: number,
//         sidebarTab: number,
//         isLoggedIn: boolean,
//         selected_kafka_topic_index: number,
//         kafka_topics: string[],
//         kafka_partitions: string[],
//         coreData: { 
//             producers: string[],
//             topic: string,
//             consumers: string[],
//             connectors: null,  
//         }[]
//     },
//     dummyConnectionState: {
//         url_prometheus: string,
//         url_kafka: string,
//         isConnected: boolean,
//         valid_prom_url: boolean,
//         valid_kafka_url: boolean,
//     } 
// }

const initialState: AppContextInterface = {
    dummyGlobalState: {
        username:null,
        id:null,
        sidebarTab:0,
        isLoggedIn: true,
        selected_kafka_topic_index:0,
        kafka_topics: [],
        kafka_partitions: [],
        coreData:[ // this is Prometheus's dummy data for Producer-Topic-Consumer diagrams
            {
            producers:["Producer 1", "Producer 2"],
            topic: 'Topic #1',
            consumers:['Consumer 1'],
            connectors:null,
            },
            {
            producers:["Producer 1", "Producer 2", "Producer 3"],
            topic: 'Topic #2',
            consumers:['Consumer 1'],
            connectors:null,
            },
            {
            producers:["Producer 1"],
            topic: 'Topic #3',
            consumers:['Consumer 1', "Consumer 2", "Consumer 3", "Consumer 4"],
            connectors:null,
            },
            {
            producers:["Producer 1", "Producer 2","Producer 3", "Producer 4","Producer 5", "Producer 6"],
            topic: 'Topic #4',
            consumers:['Consumer 1'],
            connectors:null,
            },
            {
            producers:["Producer 1", "Producer 2"],
            topic: 'Topic #5',
            consumers:['Consumer 1', "Consumer 2"],
            connectors:null,
            }
        ]
    },
    dummyConnectionState: {
        // url_prometheus: 'https://9090-kayhill-cpdemo-ps7f5q3opnq.ws-us34.gitpod.io/api/v1/query?query=',
        // url_kafka: "demo.saamsa.io:29093",
        url_prometheus: null,
        url_kafka: null,
        isConnected:true,
        valid_prom_url: true,
        valid_kafka_url:false,
        //past_URLS_Prometheus: [],
        //past_URLS_Kafka: []
    }
}

export default initialState;
