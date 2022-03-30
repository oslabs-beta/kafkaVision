
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

interface CoreData {
  producers: string[],
  topic: string,
  consumers: string[],
  connectors: null,  
}

interface GlobalState {
  username:string,
  id:number,
  sidebarTab:number,
  isLoggedIn: boolean,
  selected_kafka_topic_index:number,
  kafka_topics: [string],
  kafka_partitions:[string],
  coreData: CoreData[]
}

interface ConnectionState {
  url_prometheus: string,
  url_kafka: string,
  isConnected: boolean,
  valid_prom_url: boolean,
  valid_kafka_url:boolean,
}

export default interface AppContextInterface {
  globalState: GlobalState,
  connectionState: ConnectionState,
};