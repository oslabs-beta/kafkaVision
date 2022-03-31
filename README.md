![Screen Shot 2022-03-29 at 6 13 20 PM](https://user-images.githubusercontent.com/61764488/160890405-2ae61d7b-5a6c-4489-8300-08fcb243ac92.png)
# KafkaVision
### A visualization and optimization insight tool for Apache Kafka

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/oslabs-beta/kafkavision/pulls)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/oslabs-beta/reactron/LICENSE)

<details>
	<summary>Table of Contents</summary>

- [About KafkaVision](##About-KafkaVision)
- [Pre-requisites](##Pre-requisites)
- [Features](##Features)
- [How It Works](##How-It-Works)
- [Demo Testing App](##Demo-Testing-App)
- [Feature Roadmap](##Feature-Roadmap)
- [Contributors](##Contributors)
- [License](##License)
</details>


## About KafkaVision

KafkaVision simplifies monitoring of a Kafka cluster by allowing developers to:
- Quickly view a snapshot of a cluster's health
- Visualize and compare topic level metrics in a cluster

How KafkaVision saves developers time:
- Prioritizes cluster health metrics and status updates that really matter
- Provides relevant and useful graphs that update in real-time -- with no additional configuration required
- Organizes topics and partitions in an easy-to-consume visualization to inform quick consumer optimization decisions
- Eliminates the need for manual creation of PromQL queries and unfamiliar CLI commands


## Pre-requisites

To use this application, you'll need to have at least one of the following:

1. A running Kafka instance with at least one broker with a public port
2. A running Kafka instance configured with Prometheus and access to the corresponding Prometheus port

## Features

KafkaVision enables you to view your cluster information in the following ways using an interactive GUI:

**1) View Cluster Health Metrics (with Prometheus Connection)** 

Users can view the overall health of their cluster at a glance on the 'Health Metrics' page which includes auto-updating graphs displaying real-time data readings for CPU Usage, JVM Memory Used, and Time spent in GC. It also includes static metrics at the bottom of the page for counts of key cluster elements:

![health-metrics](https://user-images.githubusercontent.com/87503302/161088866-0ed37690-04f8-46f2-bcbe-1e92d3e090ee.gif)

**2) View Data Throughput at Topic-Level for TOP 5 High-Use Topics (with Prometheus Connection)**

The 'Topic Metrics' page displays real-time throughput metrics for the most active Cluster topics. Click on each topic section to expand and view graphs displaying throughput information at the topic level and click again to collapse.

![topic-metrics](https://user-images.githubusercontent.com/87503302/161089060-b9c40069-ebe4-420b-99f6-cf096906dc5d.gif)


**3) Insights into cluster topics, partitions, and consumer offsets (with Broker connection)**

The 'Partition Diagrams' page allows users to gain insight into the partitions within each Topic of their Cluster, including the number of partitions, the current offsets, and more!

![partition-diagram](https://user-images.githubusercontent.com/87503302/161098210-ac1ec57a-2aa8-4033-b6ac-cc9047049537.gif)


## Instructions
1. Clone this repo on your local machine
2. Install dependencies with `npm install`
3. Compile Typescript with `npm run compile-prod`
4. In a new terminal, run the command `npm run build-prod`
5. Then, run `npm start`
6. Open localhost:3333 to enter the KafkaVision App
7. To add a new broker or Prometheus address, add the location in the input field and click _Submit_.

## Demo Testing App
If you do not have a Kafka instance but would like to demo KafkaVision, we modified this <a href="https://github.com/confluentinc/cp-demo" onclick="return ! window.open(this.href);">public demo app </a>from Confluent Platform to scrape metrics from the cluster and export them to Prometheus using JMX-Exporter. To quickly get up and running, you can <a href='https://kayhill-cpdemo-aki26esh1q7.ws-us38.gitpod.io/' onclick="return ! window.open(this.href);">open our pre-configured demo cluster with GitPod and follow the boot instructions.</a>

## Feature Roadmap

The development team intends to continue improving KafkaVision and adding more features.
[Head to our roadmap](https://github.com/oslabs-beta/kafkavision/issues) to see our upcoming planned features.

## Built With
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Node.js](https://nodejs.org/en/) - File system, testing, core application functionality
- [Express](https://expressjs.com/) - Backend Framework
- [Webpack 5](https://webpack.js.org/) - Module Bundler
- [React](https://reactjs.org/) - Frontend Framework
- [KafkaJS](https://kafka.js.org/) - Kafka client for Node.js
- [Prometheus](https://prometheus.io/) - Time series database with event monitoring
- [ChartJS](https://www.chartjs.org/) - Rendering of metric graphs
- [Tailwind CSS](https://tailwindcss.com/) - Styling components
- [Jest](https://jestjs.io/) - Testing

## Contributors

[Isabelle Salvador](https://github.com/isabellesalvador) - [LinkedIn](https://www.linkedin.com/in/isabelle-salvador-605a67105/)
<br>
[Kayliegh Hill](https://github.com/kayhill) - [LinkedIn](https://www.linkedin.com/in/kayliegh-hill)
<br>
[Neel Lakshman](https://github.com/nlakshman) - [LinkedIn](https://www.linkedin.com/in/neel-lakshman/)
<br>
[Rob Beier](https://github.com/rfbeier) - [LinkedIn](https://www.linkedin.com/in/robert-f-beier/)
<br>

If you'd like to support the active development of KafkaVision:

- Star this repo!
- Tweet about the project
- Write a review or tutorial on Medium, Dev.to or personal blog
- Contribute to this project by raising a new issue or making a PR to solve an issue

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/oslabs-beta/kafkavision/blob/dev/LICENSE) file for details
<hr>
