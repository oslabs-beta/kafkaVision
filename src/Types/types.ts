export type Partition = {
    partition: number,
    offset: string,
    high: string,
    low: string,
}

export type ConnectionState = {
    url_prometheus: string | null,
    url_kafka: string | null,
    isConnected: boolean,
    valid_prom_url: boolean,
    valid_kafka_url: boolean,
}

export type GlobalSliceState = {
    sidebarTab:number,
    isLoggedIn: boolean,
    selected_kafka_topic_index:number,
    kafka_topics: string[],
    kafka_partitions: Partition[] | [],
}

export type GlobalContext = {
    dummyGlobalState: GlobalSliceState,
    dummyConnectionState: ConnectionState
}