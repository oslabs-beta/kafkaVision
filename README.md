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

KafkaVision has the following features:

- An intuitive and simplified GUI
- Insights into cluster topics, partitions, and consumer offsets
- Graphs to visualize & monitor overall cluster health metrics, including CPU Usage, JVM Memory Usage, Time Spent in GC, and more

## How It Works

**Getting started with KafkaVision is easy:**

1. Clone this repo on your local machine
2. Install dependencies with `npm install`
3. Compile Typescript with `npm run compile-prod`
4. In a new terminal, run the command `npm run build-prod`
5. Then, run `npm start`
6. Open localhost:3333 to enter the KafkaVision App
7. Log in or register a new account
8. To add a new broker or Prometheus address, add the location in the input field and click _Submit_.
9. On the ‘Partition Diagrams’ page, you can _Select a topic_ from the dropdown to visualize all partitions of a topic and their offsets

## Demo Testing App
If you do not have a Kafka instance but would like to demo KafkaVision, we modified this <a href="https://github.com/confluentinc/cp-demo" onclick="return ! window.open(this.href);">public demo app </a>from Confluent Platform to scrape metrics from the cluster and export them to Prometheus using JMX-Exporter. To quickly get up and running, you can <a href='https://kayhill-cpdemo-aki26esh1q7.ws-us38.gitpod.io/' onclick="return ! window.open(this.href);">open our pre-configured demo cluster with GitPod.</a>

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
- [React Flow](https://reactflow.dev/) - Rendering of relationship diagrams
- [Tailwind CSS](https://tailwindcss.com/) - Styling components
- [Jest](https://jestjs.io/) - Testing
- Love ❤️

## Contributors

[Isabelle](https://github.com/isabellesalvador) - [LinkedIn](https://www.linkedin.com/in/isabelle-salvador-605a67105/)
<br>
[Kayliegh Hill](https://github.com/kayhill) - [LinkedIn](https://www.linkedin.com/in/kayliegh-hill)
<br>
[Neel](https://github.com/nlakshman) - [LinkedIn](https://www.linkedin.com/in/neel-lakshman/)
<br>
[Rob](https://github.com/rfbeier) - [LinkedIn](https://www.linkedin.com/in/robert-beier-49795081)
<br>

If you'd like to support the active development of KafkaVision:

- Add a GitHub Star to the project.
- Tweet about the project on Twitter.
- Write a review or tutorial on Medium, Dev.to or personal blog.
- Contribute to this project by raising a new issue or making a PR to solve an issue.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/oslabs-beta/kafkavision/blob/dev/LICENSE) file for details
<hr>
