const initialState: any = {
    dummyGlobalState: {
        sidebarTab:0,
        isLoggedIn: true,
        selected_kafka_topic_index:0,
        kafka_topics: [],
        kafka_partitions: [],
    },
    dummyConnectionState: {
        // url_kafka: "demo.saamsa.io:29093",
        url_prometheus: null,
        url_kafka: null,
        isConnected:false,
        valid_prom_url: false,
        valid_kafka_url:false
        //past_URLS_Prometheus: [],
        //past_URLS_Kafka: []
    }
}

export default initialState;
