const fakeState: any = {
    dummyGlobalState: {
        username:null,
        id:null,
        sidebarTab:0,
        isLoggedIn: false,
        selectedState:1,
        coreData:[
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
        url_prometheus: 'https://9090-kayhill-cpdemo-ps7f5q3opnq.ws-us34.gitpod.io/api/v1/query?query=',
        url_kafka: null,
        isConnected:true,
    }
}



export default fakeState;