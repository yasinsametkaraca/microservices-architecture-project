# Microservices Project

This project is a microservices architecture project that is built using node.js, express.js, and mongodb. The project is a simple project that has two microservices, one for the user and the other for the product. The user microservice is responsible for handling the user's data and the product microservice is responsible for handling the product's data. The project is built using the docker-compose tool to run the project in a containerized environment.

## What is a Microservice?
A microservice is a small, loosely coupled distributed service that is designed to be independently deployable and scalable. Microservices are typically organized around business capabilities and are independently deployable.

## Why Microservices?
- **Scalability**: Microservices can be scaled independently.
- **Flexibility**: Microservices can be written in different languages and can be deployed independently.
- **Resilience**: If one service fails, it does not affect the entire system.
- **Maintainability**: Microservices are easier to maintain and update.
- **Decentralization**: Microservices can be developed and deployed by different teams.
- **Performance**: Microservices can be optimized for performance.
- **Reusability**: Microservices can be reused across different applications.
- **Security**: Microservices can be secured independently.
- **Cost-Effective**: Microservices can be developed and deployed independently.
- **Agility**: Microservices can be developed and deployed quickly.

## Characteristics of Microservices
- **Decentralized Data Management**: Each microservice has its own database.
- **Decentralized Governance**: Each microservice has its own governance.
- **Decentralized Communication**: Microservices communicate with each other using APIs.
- **Decentralized Development**: Microservices can be developed by different teams.
- **Decentralized Deployment**: Microservices can be deployed independently.
- **Decentralized Monitoring**: Microservices can be monitored independently.
- **Decentralized Security**: Microservices can be secured independently.
- **Decentralized Scalability**: Microservices can be scaled independently.
- **Decentralized Testing**: Microservices can be tested independently.

## Microservices Architecture

### Gateway
The gateway is the entry point for all requests. It routes requests to the appropriate microservice.

### Proxy
The proxy is used to route requests to the appropriate microservice.

### Service
The service is a microservice that performs a specific task.

### Database
The database is used to store data.

### Message Queue
The message queue is used to send messages between microservices.

### Cache
The cache is used to store data temporarily.

### Message Broker
The message broker is used to send messages between microservices. Publish message is used to send messages to the message broker and Subscribe message is used to receive messages from the message broker.

`Message Broker`: A system that transmits messages from one place to another.

`Channel`: The structure through which messages are transmitted between two applications.

`Queue`: The structure where messages are lined up in sequence.

`Persist`: The process of storing messages in a queue.

`Publish`: The process of broadcasting a message to a specific queue.

`Subscribe`: The process of listening to and handling messages.

`Exchange`: A structure that determines which queue the messages should be routed to.

### Consumer and Producer Difference
The consumer consumes messages from the message queue and the producer produces messages to the message queue.
For example I have a email service that sends email to the user. The email service is the producer and the user is the consumer.

``Producer``: Application that sends the messages.

``Consumer``: Application that receives the messages.

``Queue``: Stores messages that are consumed by applications

### What is a Message Broker?
A message broker is an intermediary service between producers and consumers that acts as a communication hub between different systems or components. It is responsible for routing messages from senders to receivers as well as transforming and filtering messages based on rules and criteria .

Message brokers are middleware systems that aid the exchange of messages between different systems or applications.

### What is a Message Queue?
A message queue is a popular messaging pattern used in distributed systems. It is a mechanism that enables different software components or systems to communicate and exchange data asynchronously.
It operates by allowing producers to send messages to a queue, which consumers then retrieve in a FIFO (first-in, first-out) order. This allows applications to send and receive messages or data without requiring both applications to be active and available at the same time. Instead, messages are stored in a queue until the receiving application is ready to process them.

### What is the RPC (Remote Procedure Call)?
RPC (Remote Procedure Call) is a protocol that one program can use to request a service from a program located on another computer in a network without having to understand the network's details. A procedure call is also sometimes known as a function call or a subroutine call.

Redundant data is a common problem in microservices architecture. To solve this problem with RPC, you can use a message broker to send messages between microservices.

We all know how to call api and get some response with the help of HTTP calls in NodeJS but when it comes to distributed DB we need to think about a machanism to fullfil the requirement.

In this repository we have implemented Message Broker RPC call to communicate with other microservice to get on demand data from distributed DB.

#### In the RPC (Remote Procedure Call) Pattern Using RabbitMQ

**`requestData`** and **`RPCObserver`** serve different roles, and understanding their interaction is crucial:

##### `requestData` (Client):

The client sends a request to a specific RabbitMQ queue and waits for a response. Even though the **`RPCObserver`** (server) is listening for incoming requests, the client must still wait for the response because it doesn't know when the server will complete the task. This waiting is necessary because the RPC pattern simulates a synchronous request-response flow, even though the communication is happening asynchronously through queues.

- **Why wait for a response?**: The client (via `requestData`) needs the result of the operation before proceeding. Without the result, it cannot continue its logic. The **`RPCObserver`** might take time to process the request, especially if the operation is expensive or time-consuming, and the client needs to wait for that processing to finish. If the client doesn’t wait, the whole purpose of making a request and getting a result is lost.

##### `RPCObserver` (Server):

The **`RPCObserver`** listens to the queue, processes the requests it receives, and sends a response back to the client. Just because the server is listening and processing requests doesn’t mean the client should assume the response will instantly be ready. Depending on the workload or complexity of the request, the server might take a while to send the response.

##### Key Point:
The client (`requestData`) waits because the RPC model is about making a request and expecting a result. The **`RPCObserver`** is listening and will send the response when it's ready, but the client must still handle the delay or timeout. The client and server operate asynchronously, but the client needs the result to proceed. This waiting is what enables the RPC mechanism to work in a request-response flow over RabbitMQ queues.


#### RabbitMQ Operations Without RPC:

When using RabbitMQ, operations occur in a completely asynchronous manner. In this setup, a producer sends messages to queues, and a consumer can take and process these messages whenever needed. The client leaves the message in the queue and does not have to wait for a response.

- **Message-based communication**: There can be a time gap between when the message is sent and when it is processed. RabbitMQ ensures that tasks are distributed and taken from the queue. In this model, the initiator simply places the message in the queue and does nothing further, not expecting an immediate result. The consumer retrieves the message from the queue, processes it, and completes its own tasks.
- **Usage Example**: A producer leaves a message in the queue for a specific operation. The consumer retrieves this message at a later time and processes it. The result does not directly return to the producer, and the process is independent.

#### RPC and RabbitMQ Operations:

When using RPC with RabbitMQ, an asynchronous request-response system is created. The client sends a request to a RabbitMQ queue and waits for the result. This waiting simulates synchronous processing, even though message queues are operating in the background.

- **Response Waiting**: In RPC, the client waits for the server to complete the process. RabbitMQ forwards the request to the server, and after the server finishes processing, it sends the result back to a response queue. The client retrieves the result from these response queues. The client waits until the process is fully completed.
- **Usage Example**: A client sends a computation request to a RabbitMQ queue. The server takes this request, performs the computation, and places the result back in the queue. The client waits for the result, and the operation is considered complete only when the result is received.

#### Key Differences:

##### Asynchronous Operations with RabbitMQ (Without RPC):

- The client sends a message and does not wait for the result.
- There is no direct response process between the producer and the consumer. The operations are completely independent.
- **Usage**: Background processes, independent tasks.

##### Synchronous Operations with RPC and RabbitMQ:

- The client sends a request and waits for the result.
- A request-response cycle is established over RabbitMQ queues. The client waits until the response is received and the process is considered complete.
- **Usage**: Scenarios where the client starts an operation and needs to get the result (e.g., database queries, heavy computations).

##### Should the Main Operation (db operations etc.) Be Done in `RPCObserver` or in the Return of `requestData`?

The main operation (such as a database query, computation, or other time-consuming tasks) should be performed in the **`RPCObserver`**. This is because **`RPCObserver`** acts as the server and processes incoming requests, while `requestData` only sends the request and waits for the result.

##### 1. The Main Operation is Done in `RPCObserver`:
- **Role**: `RPCObserver` receives requests and performs the main operation. This could be a long-running or resource-intensive task (such as a database query, file processing, or calling an external API).
- **How It Works**: When a request is sent to the RabbitMQ queue, `RPCObserver` captures it and processes it. Once the operation is complete, `RPCObserver` sends the result back to `requestData` (the client) through the queue.

##### 2. `requestData` Waits for the Result:
- **Role**: `requestData` is responsible for sending a request and waiting for the response. It listens to a temporary queue and waits for the result of the operation that was processed by `RPCObserver`.
- **Return Section**: The return part of `requestData` simply provides the result processed by `RPCObserver`. `requestData` does not handle the main operation itself; it just sends the request and returns the result once it receives the response from the server.

##### In Summary:
- **The operation is done in `RPCObserver`**: The server processes the request, such as performing a database query, file operation, or complex computation.
- **`requestData` waits for the result**: The client uses `requestData` to send the request and wait for the result, but the main operation is handled by `RPCObserver` and the result is returned to `requestData`.

This ensures the correct roles for both the client and server in the asynchronous nature of RPC with RabbitMQ.

## How to run the project:

Docker Compose:
```
docker-compose up --build
```


## Rule
See how a minor change to your commit message style can make you a better programmer.

Format: `<type>(<scope>): <subject>`

`<scope>` is optional

### Example

```
feat: add hat wobble
^--^  ^------------^
|     |
|     +-> Summary in present tense.
|
+-------> Type: chore, docs, feat, fix, refactor, style, or test.
```
More Examples:

- `feat`: (new feature for the user, not a new feature for build script)
- `fix`: (bug fix for the user, not a fix to a build script)
- `docs`: (changes to the documentation)
- `style`: (formatting, missing semi colons, etc; no production code change)
- `refactor`: (refactoring production code, eg. renaming a variable)
- `test`: (adding missing tests, refactoring tests; no production code change)
- `chore`: (updating grunt tasks etc; no production code change)
