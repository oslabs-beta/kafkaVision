const initialState: any = {
    dummyGlobalState: {
        //Populates buttons in the sidebar
        sidebarTab:0,
        //State used to conditionally render pages
        isLoggedIn: true,
        //Used to dictate which topic is selected from drop down menu in Partitions Diagram
        selected_kafka_topic_index:0,
        //Array of all topics fetched for Partitions Diagram drop down menu
        kafka_topics: [],
        //Array of all partitions fetched for Partitions Diagram drop down menu
        kafka_partitions: [],
    },
    dummyConnectionState: {
        //Allows user to execute the queries to fetch the proper metrics
        url_prometheus: null,
        url_kafka: null,
        //State used to dictate which connected component renders in the header
        isConnected:true,
        //If false, an error message will render 
        valid_prom_url: true,
        valid_kafka_url: true
    }
}

export default initialState;
