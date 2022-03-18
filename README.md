# KafkaVision

KafkaVision is an easy-to-use web application built to help visualize your Apache Kafka cluster. 

- Quickly view a snapshot of your cluster's health


## Table of Contents

- Pre-requisites
- Features
- How it works
- Demo Testing App
- Feature roadmap
- Contribute
- License

## Pre-requisites

To use this application, you'll need to have one or both of the following:

1. A running Kafka instance with at least one broker with an available plaintext port 
2. A running Kafka instance configured with Prometheus and access to the corresponding Prometheus port 

## Features

KafkaVision has the following features:

- An intuitive and simplified GUI
- Insights into cluster topics, brokers, partitions, and controllers
- Graphs to visualize & monitor overall cluster health metrics, including CPU Usage, JVM Memory Usage, and Time Spent in GC
- Intuitive diagrams to model the relationships between cluster components

## How it works

**Getting started with KafkaVision is easy:**

1. Clone this repo on your local machine
2. Run the command 'npm run build-prod'
3. In a new terminal, run the command 'npm start'
4. Open localhost:3333 to enter the KafkaVision App
5. Log in or register.
6. To add a new broker or Prometheus address, add the location in the input field and click _Submit_.
7. To use an already submitted broker address, Click on the dropdown next to _Select broker_ and choose the preferred broker.
8. On the 'Component Relationships' page, you can _Select a topic_ from the dropdown to visualize your cluster.

## Demo Testing App
If you do not have a Kafka instance but would like to demo KafkaVision, we suggest using Confluent Platform's demo app (with Prometheus configured) available here: 

To quickly get the cluster up and running, <a href='https://kayhill-cpdemo-aki26esh1q7.ws-us38.gitpod.io/' onclick="return ! window.open(this.href);">open the cluster with GitPod.</a>

## Feature Roadmap

The development team intends to continue improving KafkaVision and adding more features.
[Head to our roadmap](https://github.com/oslabs-beta/kafkavision/issues) to see our upcoming planned features.

## Contributors

[Isabelle](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/)
<br>
[Kayliegh](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/kayliegh-hill)
<br>
[Neel](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/)
<br>
[Rob](https://github.com/) - [LinkedIn](https://www.linkedin.com/in/)
<br>

If you'd like to support the active development of KafkaVision:

- Add a GitHub Star to the project.
- Tweet about the project on Twitter.
- Write a review or tutorial on Medium, Dev.to or personal blog.
- Contribute to this project by raising a new issue or making a PR to solve an issue.

<hr>
