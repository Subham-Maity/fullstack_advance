

Redis Pub/Sub implements the messaging system where the senders (publishers) sends the messages while the receivers (subscribers) receive them. The link between the publishers and subscribers is called channel.

- Step 1: Open two terminals.

- Open redis-cli in the first terminal and also in the second terminal. (steps are the given below)
    - docker ps (to get the container id)
    - if not running then run the container using docker start container_id or `docker start redis-stack` and then `docker exec -it redis-stack redis-cli` or `docker exec -it container_id bash` and then `redis-cli` to open redis-cli.

- Now write the following command in the first terminal to subscribe to the channel.

```bash
SUBSCRIBE notifications
```

- Now write the following command in the second terminal to publish a message to the channel.

```bash
PUBLISH notifications "Hello, World!"
```

- You will see the following output in the first terminal.

```bash
Reading messages... (press Ctrl-C to quit)

1) "subscribe"
2) "notification"
3) (integer) 1
1) "message"
2) "notification"
3) "subham"

Reading messages... (press Ctrl-C to quit)
```

It is beneficial when you want to scale your socket.io application. You can use redis pub/sub to communicate between multiple socket.io servers.

Some Usecases of Redis Pub/Sub

- Chat application
- Real-time analytics
- Real-time notifications
- Distributed locks
- Distributed cache invalidation
- Distributed session management
- Distributed job queue
- Distributed event-driven programming
- Distributed publish/subscribe system
- Distributed system monitoring
- Distributed system coordination
- Distributed system configuration

#### Cli Commands

- [**Pub/Sub**](#pubsub)
    - [**9.1. SUBSCRIBE**](#91subscribe)
    - [**9.2. UNSUBSCRIBE**](#92unsubscribe)
    - [**9.3. PUBLISH**](#93publish)
    - [**9.4. PUBSUB**](#94pubsub)


##### 9.1.SUBSCRIBE

This command subscribes to the specified channels.

```bash

SUBSCRIBE notifications

Reading messages... (press Ctrl-C to quit)

1) "subscribe"

2) "notifications"

3) (integer) 1
```

##### 9.2.UNSUBSCRIBE

This command unsubscribes from the specified channels.

```bash

SUBSCRIBE notifications

Reading messages... (press Ctrl-C to quit)

1) "subscribe"

2) "notifications"

3) (integer) 1

UNSUBSCRIBE notifications

Reading messages... (press Ctrl-C to quit)

1) "unsubscribe"

2) "notifications"

3) (integer) 0
```

##### 9.3.PUBLISH

This command publishes the specified message to the specified channel.

```bash

SUBSCRIBE notifications

Reading messages... (press Ctrl-C to quit)

1) "subscribe"

2) "notifications"

3) (integer) 1

PUBLISH notifications "Hello, World!"

(integer) 1

1) "message"

2) "notifications"

3) "Hello, World!"
```

##### 9.4.PUBSUB

This command returns information about the channels.

```bash

SUBSCRIBE notifications

Reading messages... (press Ctrl-C to quit)

1) "subscribe"

2) "notifications"

3) (integer) 1

PUBSUB CHANNELS

1) "notifications"
```

There are a lot of other commands in redis-cli. You can check them out by typing `help` in redis-cli.