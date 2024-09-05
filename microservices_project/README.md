# Microservices Project

## Microservices

### What is a Microservice?
A microservice is a small, loosely coupled distributed service that is designed to be independently deployable and scalable. Microservices are typically organized around business capabilities and are independently deployable.

### Why Microservices?
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

### Characteristics of Microservices
- **Decentralized Data Management**: Each microservice has its own database.
- **Decentralized Governance**: Each microservice has its own governance.
- **Decentralized Communication**: Microservices communicate with each other using APIs.
- **Decentralized Development**: Microservices can be developed by different teams.
- **Decentralized Deployment**: Microservices can be deployed independently.
- **Decentralized Monitoring**: Microservices can be monitored independently.
- **Decentralized Security**: Microservices can be secured independently.
- **Decentralized Scalability**: Microservices can be scaled independently.
- **Decentralized Testing**: Microservices can be tested independently.

### Microservices Architecture

#### Gateway
The gateway is the entry point for all requests. It routes requests to the appropriate microservice.

#### Proxy
The proxy is used to route requests to the appropriate microservice. 

#### Service
The service is a microservice that performs a specific task. 

#### Database
The database is used to store data.

#### Message Queue
The message queue is used to send messages between microservices.

#### Cache
The cache is used to store data temporarily.

#### Message Broker
The message broker is used to send messages between microservices. Publish message is used to send messages to the message broker and Subscribe message is used to receive messages from the message broker.

`Message Broker`: A system that transmits messages from one place to another.

`Channel`: The structure through which messages are transmitted between two applications.

`Queue`: The structure where messages are lined up in sequence.

`Publish`: The process of broadcasting a message to a specific queue.

`Subscribe`: The process of listening to and handling messages.

`Exchange`: A structure that determines which queue the messages should be routed to.

#### Consumer and Producer Difference
The consumer consumes messages from the message queue and the producer produces messages to the message queue.
For example I have a email service that sends email to the user. The email service is the producer and the user is the consumer. 

``Producer``: Application that sends the messages.

``Consumer``: Application that receives the messages.

``Queue``: Stores messages that are consumed by applications

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