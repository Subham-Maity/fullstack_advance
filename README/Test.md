
## Introduction:
Redis is an open-source, in-memory key-value data store. It is versatile and can be used as a database, cache, and message broker. Redis supports various data structures such as Strings, Hashes, Lists, Sets, and more. It provides high availability via Redis Sentinel and automatic partitioning across multiple Redis nodes with Redis Cluster.

## Installation:

1. Download Docker Desktop from the official [Docker website](https://www.docker.com/products/docker-desktop).
2. Install Docker Desktop and open it.
3. Open the terminal and run the following command to start the Redis server and Redis Commander:

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

This command will run the Redis server on port 6379 and Redis Commander on port 8001.

4. Open a web browser and navigate to `localhost:8001` to view the Redis Commander.
5. Go back to the terminal and run `docker ps` to check if the Redis server is running. If it's not, run `docker start redis-stack`.

Now, you can use the Redis server in your project.

## Redis CLI Commands:

1. Run `docker ps` in the terminal to check the running container and copy the container id.
2. Use `docker exec -it <container_id> bash` to open the bash terminal of the container. For example: `docker exec -it 7b7e bash`.
3. Type `redis-cli` to open the Redis CLI terminal.
4. Type `ping` to check if the Redis server is running. If you get `PONG`, then the server is running.

## Nodejs Setup

1. open the 5.redis folder and run the following command
```bash
npm run string
npm run list
npm run set
npm run hash
npm run sortedset
npm run stream
npm run bitmap
npm run geo
npm run pubsub
npm run dev 
```
2. open the server/src/client.ts setup the redis client
```bash
import Redis from "ioredis";

const client = new Redis({
    host: 'localhost', // replace with your host, if not localhost
    port: 6379  // replace with your port, if not 6379
});

export default client;
```
3. open the 5.redis folder and you will get the following files
- string.ts
- list.ts
- set.ts
- hash.ts
- sortedset.ts
- stream.ts
- bitmap.ts
- geo.ts
- pubsub.ts
- src/client.ts
- src/todos.ts

## Time complexity, Limitations, Use cases
- Time Complexity
    - Hashes: O(1) for each key-value pair, O(N) for N key-value pairs.
    - Lists: O(1) for each push/pop operation, O(N) for N items in the list.
    - Sets: O(1) for each add/remove operation, O(N) for N items in the set.
    - Sorted Sets: O(1) for each add/remove operation, O(log(N)+M) for N items in the sorted set and M elements returned.
    - Streams: O(1) for each item added to the stream, O(N) for N items in the stream.
    - Bitmaps: O(1) for each set bit, O(N) for N bits set.
    - Geo: O(log(N)) for each item added to the sorted set, where N is the number of elements in the sorted set.
    - Pub/Sub: O(N+M) for N channels and M subscribers.
- Limitations
    - Hashes: The maximum number of fields is (2^32 - 1)4294967295, more than 4 billion of fields per hash).
    - Lists: The maximum number of elements is (2^32 - 1)4294967295, more than 4 billion of elements per list).
    - Sets: The maximum number of members is (2^32 - 1)4294967295, more than 4 billion of elements per set).
    - Sorted Sets: The maximum number of members is (2^32 - 1)4294967295, more than 4 billion of elements per sorted set).
    - Streams: The maximum number of entries is (2^64 - 1)18446744073709551615, more than 18 quintillion of entries per stream).
    - Bitmaps: The maximum number of bits is (2^32 - 1)4294967295, more than 4 billion of bits per bitmap).
    - geo: The maximum number of members is (2^32 - 1)4294967295, more than 4 billion of elements per geo set).
    - Pub/Sub: The maximum number of channels is 2^32 - 1)4294967295, more than 4 billion of channels per Redis instance).
- Use cases
    - Redis hash—Use hashes when you have a large number of fields to store. For example, you can use hashes to store user information, such as name, email, address, and more.
    - Redis list—Use lists when you want to store a list of items. For example, you can use lists to store a list of products, a list of users, and more.
    - Redis set—Use sets when you want to store a unique list of items. For example, you can use sets to store a list of tags, a list of followers, and more.
    - Redis sorted set—Use sorted sets when you want to store a list of items in a sorted order. For example, you can use sorted sets to store a list of products sorted by price, a list of users sorted by age, and more.
    - Redis stream—Use streams when you want to store a list of items in a chronological order. For example, you can use streams to store a list of events, a list of messages, and more.
    - Bitmap — Use bitmaps when you want to store a list of items in a chronological order. For example, you can use bitmaps to store a list of events, a list of messages, and more.
    - Geo — Use geo when you want to store a list of items in a chronological order. For example, you can use geo to store a list of events, a list of messages, longitudes, latitudes, and more.
    - Pub/Sub — Use pub/sub when you want to store a list of items in a chronological order. For example, you can use pub/sub to store a list of events, a list of messages, and more.


## Data Types

### String Data Structure:

#### Cli Commands
- [**String Data Structure**](#1string-data-structure)
    - [**1.1. set name**](#11set-name)
    - [**1.2. get name**](#12get-name)
    - [**1.3. setnx**](#13setnx)
    - [**1.4. MSET**](#14mset)
    - [**1.5. MGET**](#15mget)
    - [**1.6. INCR**](#16incr)
    - [**1.7. INCRBY**](#17incrby)
    - [**1.8. GETRANGE**](#18getrange)
    - [**1.9. SETRANGE**](#19setrange)
    - [**1.10. GETRANGE**](#110getrange)
    - [**1.11. STRLEN**](#111strlen)
    - [**1.12. APPEND**](#112append)
    - [**1.13. SETEX**](#113setex)
    - [**1.14. SETNX**](#114setnx)
    - [**1.15. MSETNX**](#115msetnx)
    - [**1.16. SETRANGE**](#116setrange)
    - [**1.17. GETRANGE**](#117getrange)
    - [**1.18. STRLEN**](#118strlen)
    - [**1.19. DECR**](#119decr)
    - [**1.20. DECRBY**](#120decrby)
    - [**1.23. PSETEX**](#121psetex)


#### 1.1.set name
Type `set name "subham"` to set a key-value pair in the Redis server.
#### 1.2.get name

Type `get name` to retrieve the value of the key from the Redis server.

Note: If you open your Redis stack in the browser, you will see the key and value set. You can also update the value from there. Just click on the key and update the value on the right side.
The Best way to do this is
```bash
set user:1 "subham"

set user:2 "codexam"

set user:3 "xamcodexam"

set msg:1 "hello"

set msg:2 "hi"

set msg:3 "hey"
```
If you group on the redis-stack you will see the data like this
```bash
user
    1: "subham"
    2: "codexam"
    3: "xamcodexam"

msg
    1: "hello"
    2: "hi"
    3: "hey"
```
#### 1.3.setnx
set if not exists(nx)
```bash
set user:1 "subham" nx
```
if you don't use nx, then it will overwrite the value
```bash
set user:1 "codexam"
```

#### 1.4.MSET
set multiple values

```bash
mset user:1 "subham" user:2 "codexam" msg:1 "hello" msg:2 "hi"
```

#### 1.5.MGET
get multiple values

```bash
mget user:1 user:2 msg:1 msg:2

1) "subham"
2) "codexam"
3) "hello"
4) "hi"
```
#### 1.6.INCR
increment the value by 1

```bash
set user:1 10

incr user:1

(integer) 11
```

#### 1.7.INCRBY
increment the value by 5

```bash
set user:1 10

incrby user:1 5

(integer) 15
```
Note: By default a single Redis string can be a maximum of 512MB in size.

#### 1.8.GETRANGE
get the value from the range(SUBSTRING)

```bash
set user:1 "subham"

getrange user:1 0 3

"subh"
```
#### 1.9.SETRANGE
set the value from the range(SUBSTRING)

```bash
set user:1 "subham"

setrange user:1 0 "codexam"

(integer) 7

get user:1

"codexam"
```

#### 1.10.GETRANGE
get the value from the range(SUBSTRING)

```bash
set user:1 "subham"

getrange user:1 0 3

"subh"
```

#### 1.11.STRLEN
get the length of the value

```bash
set user:1 "subham"

strlen user:1

(integer) 6
```

#### 1.12.APPEND
append the value

```bash
set user:1 "subham"

append user:1 " codexam"

(integer) 14

get user:1

"subham codexam"
```

#### 1.13.SETEX
set the value with expiration time (in seconds)


```bash
setex user:1 10 "subham"

(integer) 1

get user:1

"subham"

get user:1

(nil)
```

#### 1.14.SETNX
set the value if the key doesn't exist

```bash
setnx user:1 "subham"

(integer) 1

get user:1

"subham"

setnx user:1 "codexam"

(integer) 0

get user:1

"subham"
```

#### 1.15.MSETNX
set multiple values if the key doesn't exist

```bash

msetnx user:1 "subham" user:2 "codexam" msg:1 "hello" msg:2 "hi"


(integer) 1

get user:1

"subham"

get user:2

"codexam"

get msg:1

"hello"

get msg:2

"hi"
```

#### 1.16.SETRANGE
set the value from the range(SUBSTRING)

```bash

set user:1 "subham"

setrange user:1 0 "codexam"

(integer) 7

get user:1

"codexam"
```

#### 1.17.GETRANGE
get the value from the range(SUBSTRING)

```bash

set user:1 "subham"

getrange user:1 0 3

"subh"
```


#### 1.18.STRLEN
get the length of the value

```bash

set user:1 "subham"

strlen user:1

(integer) 6
```

#### 1.19.DECR
This command decreases the value of a key by 1. If the key does not exist, it is set to -1.

```bash
set user:1 10

decr user:1

(integer) 9
```

#### 1.20.DECRBY
This command decreases the value of a key by the given number. If the key does not exist, it is set to negative the given number.

```bash
set user:1 10

decrby user:1 5

(integer) 5
```


#### 1.21.PSETEX
This command sets the value and expiration in milliseconds of a key.

```bash
psetex user:1 10000 "subham"

(integer) 1

get user:1

"subham"

get user:1

(nil)
```
### List Data Structure:

A **list data structure** is a collection of elements in the order they are inserted. It is similar to an array in other programming languages. The list data structure is often used to implement other data structures like queues and stacks.

#### List Operations

Here are some operations performed on a list:

| Operation | Element |
|-----------|---------|
| Push      | 1       |
| Push      | 2       |
| Push      | 3       |
| Pop       | 3       |
| Pop       | 2       |
| Pop       | 1       |


#### Cli Commands
- [**List Data Structure**](#list-data-structure)
    - [**2.1. LPUSH**](#21lpush)
    - [**2.2. RPUSH**](#22rpush)
    - [**2.3. LPOP**](#23lpop)
    - [**2.4. RPOP**](#24rpop)
    - [**2.5. LLEN**](#25llen)
    - [**2.6. LRANGE**](#26lrange)
    - [**2.7. LINDEX**](#27lindex)
    - [**2.8. LSET**](#28lset)
    - [**2.9. LINSERT**](#29linsert)
    - [**2.10. LSET**](#210lset)
    - [**2.11. LTRIM**](#211ltrim)
    - [**2.12. LREM**](#212lrem)
    - [**2.13. RPOPLPUSH**](#213rpoplpush)
    - [**2.14. BRPOP**](#214brpop)
    - [**2.15. BLPOP**](#215blpop)
    - [**2.16.BRPOPLPUSH**](#216brpoplpush)



#### 2.1.LPUSH
This command inserts the specified value at the head of the list.

```bash
lpush user:1 "subham"
lpush user:1 "codexam"
```

Visualize the list in the Redis Commander.
Last In First Out (LIFO) (similar to stack)

| Index | Element |
|-------|---------|
| 0     | codexam |
| 1     | subham  |

#### 2.2.RPUSH

This command inserts the specified value at the tail of the list.

```bash
rpush user:1 "subham"
rpush user:1 "codexam"
```

Visualize the list in the Redis Commander.

| Index | Element |
|-------|---------|
| 0     | subham  |
| 1     | codexam |



---
#### Note

*Redis can be used to implement a **stack** data structure, which follows a Last In, First Out (LIFO) principle. You can use the `lpush` command to insert elements at the head of the list, and the `lpop` command to remove elements from the head of the list.*

#### Here's an example of how you can use Redis commands to implement a stack:

```bash
lpush user:1 "subham"
lpush user:1 "codexam"

lpop user:1  # Output: "codexam"
lpop user:1  # Output: "subham"
```

#### Visualization in Redis Commander

- After `lpush` operations:

| Index | Element |
|-------|---------|
| 0     | codexam |
| 1     | subham  |

- After first `lpop` operation:

| Index | Element |
|-------|---------|
| 0     | subham  |

- After second `lpop` operation:

| Index | Element |
|-------|---------|
|       |         |

*As you can see, the last element pushed to the stack is the first one to be popped, which is characteristic of a stack.*

---

#### 2.3.LPOP

This command removes and returns the first element of the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

lpop user:1

"codexam"
```

#### 2.4.RPOP

This command removes and returns the last element of the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

rpop user:1

"subham"
```

#### 2.5.LLEN

This command returns the length of the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

llen user:1 

(integer) 2
```

#### 2.6.LRANGE

This command returns the specified range of elements from the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

lrange user:1 0 1

1) "codexam"

2) "subham"
```

#### 2.7.LINDEX

This command returns the element at the specified index.

```bash 
lpush user:1 "subham"

lpush user:1 "codexam"

lindex user:1 0

"codexam"
```

#### 2.8.LSET

This command sets the value at the specified index.

```bash
lpush user:1 "subham"

lpush user:1 "codexam"

lset user:1 0 "xamcodexam"

"OK"

lrange user:1 0 1

1) "xamcodexam"

2) "subham"
```

#### 2.9.LINSERT

This command inserts the specified value before or after the specified pivot value.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

linsert user:1 before "subham" "xamcodexam"

(integer) 3

lrange user:1 0 1

1) "codexam"

2) "xamcodexam"

3) "subham"
```

#### 2.10.LSET

This command sets the value at the specified index.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

lset user:1 0 "xamcodexam"

"OK"

lrange user:1 0 1

1) "xamcodexam"

2) "subham"
```

#### 2.11.LTRIM

This command trims the list to the specified range.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

ltrim user:1 0 1

"OK"

lrange user:1 0 1

1) "codexam"

2) "subham"
```

#### 2.12.LREM

This command removes the specified number of occurrences of the specified value from the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

lpush user:1 "subham"

lpush user:1 "codexam"

lrem user:1 2 "subham"

(integer) 2

lrange user:1 0 1

1) "codexam"

2) "codexam"
```

#### 2.13.RPOPLPUSH

This command removes the last element from the source list and pushes it to the destination list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

rpoplpush user:1 user:2

"subham"

lrange user:1 0 1

1) "codexam"

lrange user:2 0 1

1) "subham"
```


#### 2.14.BRPOP

This command is similar to `rpop`, but it blocks the connection until an element is available or the timeout is reached.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

brpop user:1 10

1) "user:1"

2) "codexam"
```

It will block the connection for 10 seconds and then return the element. If no element is available, it will return `nil`.


#### 2.15.BLPOP

This command is similar to `lpop`, but it blocks the connection until an element is available or the timeout is reached.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

blpop user:1 10

1) "user:1"

2) "codexam"
```

It will block the connection for 10 seconds and then return the element.
If no element is available, it will return `nil`.


#### 2.16.BRPOPLPUSH

This command is similar to `rpoplpush`, but it blocks the connection until an element is available or the timeout is reached.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

brpoplpush user:1 user:2 10

"subham"
```

It will block the connection for 10 seconds and then return the element. If no element is available, it will return `nil`.

### Set Data Structure:

A **set data structure** is a collection of unordered, unique elements. It is similar to a set in mathematics. The set data structure is often used to implement other data structures like queues and stacks.

#### Set Operations

Here are some operations performed on a set:

| Operation | Element |
|-----------|---------|
| Add       | 1       |
| Add       | 2       |
| Add       | 3       |
| Remove    | 3       |
| Remove    | 2       |
| Remove    | 1       |

#### Cli Commands
- [**Set Data Structure**](#set-data-structure)
    - [**3.1. SADD**](#31sadd)
    - [**3.2. SREM**](#32srem)
    - [**3.3. SISMEMBER**](#33sismember)
    - [**3.4. SMEMBERS**](#34smembers)
    - [**3.5. SPOP**](#35spop)
    - [**3.6. SRANDMEMBER**](#36srandmember)
    - [**3.7. SMOVE**](#37smove)
    - [**3.8. SCARD**](#38scard)
    - [**3.9. SINTER**](#39sinter)
    - [**3.10. SUNION**](#310sunion)
    - [**3.11. SDIFF**](#311sdiff)
    - [**3.12. SINTERSTORE**](#312sinterstore)
    - [**3.13. SUNIONSTORE**](#313sunionstore)
    - [**3.14. SDIFFSTORE**](#314sdiffstore)
    - [**3.15. SSCAN**](#315sscan)

#### 3.1.SADD

This command adds the specified member to the set.

```bash
sadd user:1 "subham"
sadd user:1 "codexam"
sadd user:1 "subham"

smembers user:1

1) "subham"

2) "codexam"
```


Visualize the set in the Redis Commander.

| Index | Element |
|-------|---------|
| 0     | subham  |
| 1     | codexam |

#### 3.2.SREM

This command removes the specified member from the set.

```bash
sadd user:1 "subham"
sadd user:1 "codexam"

srem user:1 "subham"

smembers user:1

1) "codexam"
```

#### 3.3.SISMEMBER

This command checks if the specified member is present in the set.

```bash
sadd user:1 "subham"
sadd user:1 "codexam"

sismember user:1 "subham"

(integer) 1
```

#### 3.4.SMEMBERS

This command returns all the members of the set.

```bash

sadd user:1 "subham"
sadd user:1 "codexam"

smembers user:1

1) "subham"

2) "codexam"
```

#### 3.5.SPOP

This command removes and returns a random member from the set.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

spop user:1

"codexam"
```

#### 3.6.SRANDMEMBER

This command returns a random member from the set.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

srandmember user:1

"codexam"
```

#### 3.7.SMOVE

This command moves the specified member from one set to another.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

smove user:1 user:2 "subham"

smembers user:1

1) "codexam"

smembers user:2

1) "xamcodexam"

2) "subham"
```


#### 3.8.SCARD

This command returns the number of members in the set.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

scard user:1 


(integer) 2
```

#### 3.9.SINTER

This command returns the intersection of all the sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sinter user:1 user:2

1) "subham"
```


#### 3.10.SUNION

This command returns the union of all the sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sunion user:1 user:2

1) "subham"

2) "codexam"

3) "xamcodexam"
```

#### 3.11.SDIFF

This command returns the difference between the first set and all the other sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sdiff user:1 user:2

1) "codexam"
```

#### 3.12.SINTERSTORE

This command stores the intersection of all the sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sinterstore user:3 user:1 user:2

(integer) 1

smembers user:3

1) "subham"
```

#### 3.13.SUNIONSTORE

This command stores the union of all the sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sunionstore user:3 user:1 user:2


(integer) 3

smembers user:3

1) "subham"

2) "codexam"

3) "xamcodexam"
```


#### 3.14.SDIFFSTORE

This command stores the difference between the first set and all the other sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sdiffstore user:3 user:1 user:2

(integer) 1

```

#### 3.15.SSCAN

This command scans the set for members matching the specified pattern.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sscan user:1 0 match "sub*"

1) "0"

2) 1) "subham"
```

#### Hash Data Structure:

A **hash data structure** is a collection of key-value pairs. It is similar to a hash table in other programming languages. The hash data structure is often used to implement other data structures like queues and stacks.


#### Cli Commands

- [**Hash Data Structure**](#hash-data-structure)
    - [**4.1. HSET**](#41hset)
    - [**4.2. HGET**](#42hget)
    - [**4.3. HGETALL**](#43hgetall)
    - [**4.4. HDEL**](#44hdel)
    - [**4.5. HEXISTS**](#45hexists)
    - [**4.6. HKEYS**](#46hkeys)
    - [**4.7. HVALS**](#47hvals)
    - [**4.8. HLEN**](#48hlen)
    - [**4.9. HINCRBY**](#49hincrby)
    - [**4.10. HINCRBYFLOAT**](#410hincrbyfloat)
    - [**4.11. HMSET**](#411hmset)
    - [**4.12. HMGET**](#412hmget)
    - [**4.13. HSETNX**](#413hsetnx)
    - [**4.14. HSTRLEN**](#414hstrlen)
    - [**4.15. HSCAN**](#415hscan)

#### 4.1.HSET

This command sets the specified field in the hash to the specified value.

```bash

hset user:1 name "subham"

hset user:1 email "subham@gmail.com"

```

Visualize the hash in the Redis Commander.

| Field | Value   |
|-------|---------|
| name  | subham  |
| email | codexam |

#### 4.2.HGET

This command returns the value of the specified field in the hash.

```bash

hset user:1 name "subham"

hset user:1 email "

hget user:1 name

"subham"
```

#### 4.3.HGETALL

This command returns all the fields and values of the hash.

```bash

hset user:1 name "subham"

hset user:1 email "subham@gmail.com"

hgetall user:1

1) "name"

2) "subham"

3) "email"

4) "subham@gmail.com"
```

#### 4.4.HDEL

This command deletes the specified field from the hash.

```bash

hset user:1 name "subham"

hset user:1 email "subham@gmail.com"

hdel user:1 email

(integer) 1

hgetall user:1

1) "name"

2) "subham"
```

#### 4.5.HEXISTS

This command checks if the specified field exists in the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hexists user:1 role

(integer) 1
```

#### 4.6.HKEYS

This command returns all the fields of the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hkeys user:1

1) "name"

2) "role"
```

#### 4.7.HVALS

This command returns all the values of the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hvals user:1

1) "subham"

2) "admin"
```

#### 4.8.HLEN

This command returns the number of fields in the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hlen user:1

(integer) 2
```

#### 4.9.HINCRBY

This command increments the specified field by the specified value.

```bash

hset user:1 age 20

hincrby user:1 age 5

(integer) 25
```

#### 4.10.HINCRBYFLOAT

This command increments the specified field by the specified value.

```bash

hset user:1 age 20

hincrbyfloat user:1 age 5.5

"25.5"
```

#### 4.11.HMSET

This command sets the specified fields to their respective values in the hash.

```bash

hmset user:1 name "subham" role "admin"

hgetall user:1

1) "name"

2) "subham"

3) "role"

4) "admin"
```

#### 4.12.HMGET

This command returns the values of the specified fields in the hash.

```bash

hmset user:1 name "subham" role "admin"

hmget user:1 name role

1) "subham"

2) "admin"
```

#### 4.13.HSETNX

This command sets the specified field to the specified value if the field does not exist in the hash.

```bash

hsetnx user:1 name "subham"

hsetnx user:1 name "codexam"

(integer) 0

```

#### 4.14.HSTRLEN

This command returns the length of the value of the specified field in the hash.

```bash

hset user:1 name "subham"

hstrlen user:1 name

(integer) 6
```

#### 4.15.HSCAN

This command scans the hash for fields matching the specified pattern.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hscan user:1 0 match "na*"

1) "0"

2) 1) "name"

   2) "subham"
```

### Sorted Set Operations with Redis

A **sorted set data structure** is a collection of unique elements sorted by a score. It is similar to a sorted list in other programming languages. Priority queues are often implemented using a sorted set data structure.

#### Sorted Set Operations

Here are some operations performed on a sorted set:

| Operation | Element | Score |
|-----------|---------|-------|
| Add       | 1       | 1     |
| Add       | 2       | 2     |
| Add       | 3       | 3     |
| Remove    | 3       | 3     |
| Remove    | 2       | 2     |
| Remove    | 1       | 1     |

#### Cli Commands

- [**Sorted Set Data Structure**](#sorted-set-data-structure)
    - [**5.1. ZADD**](#51zadd)
    - [**5.2. ZREM**](#52zrem)
    - [**5.3. ZSCORE**](#53zscore)
    - [**5.4. ZRANGE**](#54zrange)
    - [**5.5. ZREVRANGE**](#55zrevrange)
    - [**5.6. ZRANGEBYSCORE**](#56zrangebyscore)
    - [**5.7. ZREVRANGEBYSCORE**](#57zrevrangebyscore)
    - [**5.8. ZCARD**](#58zcard)
    - [**5.9. ZCOUNT**](#59zcount)
    - [**5.10. ZINCRBY**](#510zincrby)
    - [**5.11. ZLEXCOUNT**](#511zlexcount)
    - [**5.12. ZRANGEBYLEX**](#512zrangebylex)
    - [**5.13. ZREVRANGEBYLEX**](#513zrevrangebylex)
    - [**5.14. ZREMRANGEBYLEX**](#514zremrangebylex)
    - [**5.15. ZREMRANGEBYRANK**](#515zremrangebyrank)
    - [**5.16. ZREMRANGEBYSCORE**](#516zremrangebyscore)
    - [**5.17. ZUNIONSTORE**](#517zunionstore)
    - [**5.18. ZINTERSTORE**](#518zinterstore)
    - [**5.19. ZSCAN**](#519zscan)
    - [**5.20. ZRANK**](#520zrank)


#### 5.1.ZADD

This command adds the specified member to the sorted set with the specified score.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zrange user:1 0 -1 withscores

1) "subham"

2) "1"

3) "codexam"

4) "2"

5) "xamcodexam"

6) "3"
```


Visualize the sorted set in the Redis Commander.

| Index | Element    | Score |
|-------|------------|-------|
| 0     | subham     | 1     |
| 1     | codexam    | 2     |
| 2     | xamcodexam | 3     |


#### 5.2.ZREM

This command removes the specified member from the sorted set.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zrem user:1 "subham"

zrange user:1 0 -1 withscores

1) "codexam"

2) "2"

3) "xamcodexam"

4) "3"
```

#### 5.3.ZSCORE


This command returns the score of the specified member in the sorted set.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zscore user:1 "subham"

"1"
```

#### 5.4.ZRANGE

This command returns the specified range of elements from the sorted set.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zrange user:1 0 -1 withscores

1) "subham"

2) "1"

3) "codexam"

4) "2"

5) "xamcodexam"

6) "3"
```

#### 5.5.ZREVRANGE

This command returns the specified range of elements from the sorted set in reverse order.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zrevrange user:1 0 -1 withscores

1) "xamcodexam"

2) "3"

3) "codexam"

4) "2"

5) "subham"

6) "1"
```

#### 5.6.ZRANGEBYSCORE

This command returns the specified range of elements from the sorted set by score.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"


zadd user:1 3 "xamcodexam"

zrangebyscore user:1 1 2 withscores

1) "subham"

2) "1"

3) "codexam"

4) "2"
```

#### 5.7.ZREVRANGEBYSCORE

This command returns the specified range of elements from the sorted set by score in reverse order.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"


zadd user:1 3 "xamcodexam"

zrevrangebyscore user:1 2 1 withscores

1) "codexam"

2) "2"

3) "subham"

4) "1"
```

#### 5.8.ZCARD

This command returns the number of elements in the sorted set.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"


zadd user:1 3 "xamcodexam"

zcard user:1

(integer) 3
```

#### 5.9.ZCOUNT

This command returns the number of elements in the sorted set with a score between the specified minimum and maximum.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zcount user:1 1 2

(integer) 2
```

#### 5.10.ZINCRBY

This command increments the score of the specified member in the sorted set by the specified value.

```bash

zadd user:1 1 "subham"

zincrby user:1 2 "subham"


zrange user:1 0 -1 withscores

1) "subham"

2) "3"
```

#### 5.11.ZLEXCOUNT

This command returns the number of elements in the sorted set between the specified minimum and maximum.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zlexcount user:1 - +

(integer) 3
```

#### 5.12.ZRANGEBYLEX

This command returns the specified range of elements from the sorted set by lexicographical order.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zrangebylex user:1 - +

1) "codexam"

2) "subham"

3) "xamcodexam"
```

#### 5.13.ZREVRANGEBYLEX

This command returns the specified range of elements from the sorted set by lexicographical order in reverse order.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"


zrevrangebylex user:1 + -

1) "xamcodexam"

2) "subham"

3) "codexam"
```

#### 5.14.ZREMRANGEBYLEX

This command removes the specified range of elements from the sorted set by lexicographical order.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"


zremrangebylex user:1 - +

(integer) 3
```

#### 5.15.ZREMRANGEBYRANK

This command removes the specified range of elements from the sorted set by index.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"


zadd user:1 3 "xamcodexam"

zremrangebyrank user:1 0 1

(integer) 2
```

#### 5.16.ZREMRANGEBYSCORE

This command removes the specified range of elements from the sorted set by score.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"


zadd user:1 3 "xamcodexam"

zremrangebyscore user:1 1 2

(integer) 2
```

This command removes the specified range of elements from the sorted set by score.
```bash
zadd score 1 "subham"
zadd score 2 "codexam"
zadd score 3 "xamcodexam"

zrange score 0 -2 withscores

1) "subham"
2) "1"
3) "codexam"
4) "2"
```

#### 5.17.ZUNIONSTORE

This command stores the union of all the sorted sets specified.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:2 3 "xamcodexam"

zunionstore user:3 2 user:1 user:2

(integer) 3

zrange user:3 0 -1 withscores

1) "subham"

2) "1"

3) "codexam"

4) "2"

5) "xamcodexam"

6) "3"
```

#### 5.18.ZINTERSTORE

This command stores the intersection of all the sorted sets specified.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:2 3 "xamcodexam"

zinterstore user:3 2 user:1 user:2

(integer) 1

zrange user:3 0 -1 withscores

1) "xamcodexam"

2) "3"
```

#### 5.19.ZSCAN

This command scans the sorted set for members matching the specified pattern.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:2 3 "xamcodexam"

zscan user:1 0 match "sub*"

1) "0"

2) 1) "subham"

   2) "1"
```
#### 5.20.ZRANK

This command returns the rank of the specified member in the sorted set.

```bash

zadd user:1 1 "subham"
zadd user:1 2 "codexam"

zrank user:1 "subham"

(integer) 0
```


*Note: Normally, sets are used to store unique elements. However, sorted sets allow you to store duplicate elements. This is because each element in a sorted set is associated with a score, which makes it unique and normal sets are unordered.*


### REDIS STREAMS OPERATIONS

Redis Streams is a new feature in Redis 5.0 that allows you to store multiple fields and values in a single key. It is similar to a log file in other programming languages. Redis Streams is often used to implement other data structures like queues and stacks.

#### Cli Commands

- [**Redis Streams**](#redis-streams)
    - [**6.1. XADD**](#61xadd)
    - [**6.2. XLEN**](#62xlen)
    - [**6.3. XRANGE**](#63xrange)
    - [**6.4. XREVRANGE**](#64xrevrange)
    - [**6.5. XREAD**](#65xread)
    - [**6.6. XREADGROUP**](#66xreadgroup)
    - [**6.7. XGROUP**](#67xgroup)
    - [**6.8. XACK**](#68xack)
    - [**6.9. XCLAIM**](#69xclaim)
    - [**6.10. XDEL**](#610xdel)
    - [**6.11. XTRIM**](#611xtrim)
    - [**6.12. XINFO**](#612xinfo)
    - [**6.13. XSETID**](#613xsetid)
    - [**6.14. XREWRITE**](#614xrewrite)


#### 6.1.XADD

This command adds the specified fields and values to the stream.

It returns time stamp of the message.

```bash

xadd user:1 * name "subham" role "admin" 

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"

xrange user:1 - +

1) 1) "1578060000000-0"

   2) 1) "name"

      2) "subham"

      3) "role"

      4) "admin"
      
2) 1) "1578060000001-0"


    2) 1) "name"
    
        2) "codexam"
    
        3) "role"
    
        4) "admin"
        
3) 1) "1578060000002-0"


    2) 1) "name"
    
        2) "xamcodexam"
    
        3) "role"
    
        4) "admin"
```

#### 6.2.XLEN

This command returns the number of messages in the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"

xlen user:1

(integer) 3
```


#### 6.3.XRANGE

This command returns the specified range of messages from the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"

xrange user:1 - +

1) 1) "1578060000000-0"

   2) 1) "name"

      2) "subham"

      3) "role"

      4) "admin"
      
2) 1) "1578060000001-0"


    2) 1) "name"
    
        2) "codexam"
    
        3) "role"
    
        4) "admin"
        
        
3) 1) "1578060000002-0"


    2) 1) "name"
    
        2) "xamcodexam"
    
        3) "role"
    
        4) "admin"
```


#### 6.4.XREVRANGE

This command returns the specified range of messages from the stream in reverse order.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"

xrevrange user:1 + -

1) 1) "1578060000002-0"


    2) 1) "name"
    
        2) "xamcodexam"
    
        3) "role"
    
        4) "admin"
        
2) 1) "1578060000001-0"


    2) 1) "name"
    
        2) "codexam"
    
        3) "role"
    
        4) "admin"
        
        
3) 1) "1578060000000-0"


    2) 1) "name"
    
        2) "subham"
    
        3) "role"
    
        4) "admin"
```


#### 6.5.XREAD

This command reads the specified number of messages from the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"

xread count 2 streams user:1 0-0

1) 1) "user:1"

   2) 1) 1) "1578060000000-0"

         2) 1) "name"

            2) "subham"

            3) "role"

            4) "admin"
            
      2) 1) "1578060000001-0"
      
        
            2) 1) "name"
            
                2) "codexam"
            
                3) "role"
            
                4) "admin"
                
2) 1) "user:1"


     2) 1) 1) "1578060000002-0"
     
             2) 1) "name"
             
                  2) "xamcodexam"
             
                  3) "role"
             
                  4) "admin"
```

#### 6.6.XREADGROUP


This command reads the specified number of messages from the stream in a consumer group.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream


xreadgroup group user:1 user:1 count 2 streams user:1 0-0

1) 1) "user:1"

   2) 1) 1) "1578060000000-0"

         2) 1) "name"

            2) "subham"

            3) "role"

            4) "admin"
            
      2) 1) "1578060000001-0"
      
        
            2) 1) "name"
            
                2) "codexam"
            
                3) "role"
            
                4) "admin"
                
2) 1) "user:1"


        2) 1) 1) "1578060000002-0"
        
                2) 1) "name"
                
                    2) "xamcodexam"
                
                    3) "role"
                
                    4) "admin"
```


#### 6.7.XGROUP


This command creates a consumer group.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream

OK
```

#### 6.8.XACK

This command acknowledges the specified messages in the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream

xreadgroup group user:1 user:1 count 2 streams user:1 0-0

xack user:1 user:1 1578060000000-0 1578060000001-0

(integer) 2
```

#### 6.9.XCLAIM

This command claims the specified messages in the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream

xreadgroup group user:1 user:1 count 2 streams user:1 0-0

xclaim user:1 user:1 0-0 1578060000000-0 1578060000001-0

1) 1) "user:1"

   2) 1) 1) "1578060000000-0"

         2) 1) "name"

            2) "subham"

            3) "role"

            4) "admin"
            
      2) 1) "1578060000001-0"
      
        
            2) 1) "name"
            
                2) "codexam"
            
                3) "role"
            
                4) "admin"
                
2) 1) "user:1"


          2) 1) 1) "1578060000002-0"
            
                    2) 1) "name"
                    
                        2) "xamcodexam"
                    
                        3) "role"
                    
                        4) "admin"
```

#### 6.10.XDEL

This command deletes the specified messages in the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"


xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream

xreadgroup group user:1 user:1 count 2 streams user:1 0-0

xdel user:1 1578060000000-0 1578060000001-0

(integer) 2
```

#### 6.11.XTRIM

This command trims the specified messages in the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"


xadd user:1 * name "xamcodexam" role "admin"

xtrim user:1 maxlen 2

(integer) 1
```


#### 6.12.XINFO

This command returns information about the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xinfo stream user:1


1) 1) "length"

   2) (integer) 2
   
2) 1) "radix-tree-keys"

    2) (integer) 1
    
3) 1) "radix-tree-nodes"


    2) (integer) 2
    
4) 1) "groups"


    2) (integer) 1
    
    
5) 1) "last-generated-id"


    2) "1578060000001-0"
    
6) 1) "first-entry"


    2) 1) "1578060000000-0"
    
       2) 1) "name"
       
          2) "subham"
          
          3) "role"
          
          4) "admin"
          
7) 1) "last-entry"


    2) 1) "1578060000001-0"
    
       2) 1) "name"
       
          2) "codexam"
          
          3) "role"
          
          4) "admin"
```

#### 6.13.XSETID

This command sets the id of the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"


xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream

xreadgroup group user:1 user:1 count 2 streams user:1 0-0

xsetid user:1 1578060000000-0

OK
```

#### 6.14.XREWRITE

This command rewrites the stream to optimize memory usage.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"


xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream

xreadgroup group user:1 user:1 count 2 streams user:1 0-0

xrewrite user:1

(integer) 1
```

### Redis Bitmaps

A **bitmap data structure** is a collection of bits. It is similar to an array in other programming languages. Bitmaps are often used to implement other data structures like sets and bloom filters.

#### Cli Commands

- [**Redis Bitmaps**](#redis-bitmaps)
    - [**7.1. SETBIT**](#71setbit)
    - [**7.2. GETBIT**](#72getbit)
    - [**7.3. BITCOUNT**](#73bitcount)
    - [**7.4. BITOP**](#74bitop)
    - [**7.5. BITPOS**](#75bitpos)
    - [**7.6. BITFIELD**](#76bitfield)


#### 7.1.SETBIT

This command sets the bit at the specified index in the bitmap to either 1 or 0.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0

SETBIT pings:2024-01-01-00:00 456 1

(integer) 0
```

#### 7.2.GETBIT

This command returns the value of the bit at the specified index in the bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


GETBIT pings:2024-01-01-00:00 123

(integer) 1
```

#### 7.3.BITCOUNT

This command returns the number of bits set to 1 in the bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


SETBIT pings:2024-01-01-00:00 456 1

(integer) 0

  
BITCOUNT pings:2024-01-01-00:00

(integer) 2
```

#### 7.4.BITOP

This command performs a bitwise operation between the bitmaps and stores the result in the destination bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


SETBIT pings:2024-01-01-00:00 456 1

(integer) 0


BITOP AND pings:2024-01-01-00:00 pings:2024-01-01-00:00 pings:2024-01-01-00:00

(integer) 2
```

#### 7.5.BITPOS

This command returns the index of the first bit set to 1 or 0 in the bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


BITPOS pings:2024-01-01-00:00 1

(integer) 123
```

#### 7.6.BITFIELD

This command performs a bitwise operation between the bitmaps and stores the result in the destination bitmap.

```bash

BITFIELD pings:2024-01-01-00:00 INCRBY i5 100 1 GET u4 0

1) (integer) 0

2) (integer) 0

3) (integer) 0

4) (integer) 0
.....
```

### Geospatial Operations

A **geospatial data structure** is a collection of elements with a geospatial location. It is similar to a map in other programming languages. Geospatial data structures are often used to implement other data structures like geohashes and geofences.


#### Cli Commands

- [**Geospatial Data Structure**](#geospatial-data-structure)
    - [**8.1. GEOADD**](#81geoadd)
    - [**8.2. GEOPOS**](#82geopos)
    - [**8.3. GEODIST**](#83geodist)
    - [**8.4. GEORADIUS**](#84georadius)
    - [**8.5. GEORADIUSBYMEMBER**](#85georadiusbymember)
    - [**8.6. GEOHASH**](#86geohash)
    - [**8.7. GEOSEARCH**](#87geosearch)
    - [**8.8. GEOSEARCHSTORE**](#88geosearchstore)


#### 8.1.GEOADD

This command adds the specified elements to the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

```

#### 8.2.GEOPOS

This command returns the longitude and latitude of the specified elements in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geopos user:1 "subham" "codexam"

1) 1) "88.36389994668960571"

   2) "22.57260005994199279"
   
2) 1) "88.36389994668960571"

   2) "22.57260005994199279"
```

#### 8.3.GEODIST

This command returns the distance between the specified elements in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geodist user:1 "subham" "codexam" km


"0.0000"
```

#### 8.4.GEORADIUS

This command returns the elements within the specified radius in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

georadius user:1 88.3639 22.5726 100 km

1) "subham"

2) "codexam"
```

#### 8.5.GEORADIUSBYMEMBER

This command returns the elements within the specified radius in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

georadiusbymember user:1 "subham" 100 km

1) "subham"

2) "codexam"
```

#### 8.6.GEOHASH

This command returns the geohash of the specified elements in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geohash user:1 "subham" "codexam"

1) "tqg0y0y0y0y0"

2) "tqg0y0y0y0y0"
```

#### 8.7.GEOSEARCH

This command returns the elements matching the specified query in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geosearch user:1 frommember "subham" count 2

1) 1) "subham"

   2) 1) "88.36389994668960571"

      2) "22.57260005994199279"
      
2) 1) "codexam"

   2) 1) "88.36389994668960571"
    
      2) "22.57260005994199279"
```

#### 8.8.GEOSEARCHSTORE

This command stores the elements matching the specified query in the geospatial data structure.

```bash

geoadd user:1 88.3639 22.5726 "subham"

(integer) 1

geoadd user:1 88.3639 22.5726 "codexam"

(integer) 1

geosearchstore user:2 frommember "subham" count 2

(integer) 2
```

### Probabilistic Data Structures

You can use **probabilistic data structures** to store elements with a probability of false positives. It is similar to a set in other programming languages. Probabilistic data structures are often used to implement other data structures like bloom filters.

READ HERE: https://redis.io/docs/data-types/probabilistic/t-digest/

### Time Series Data Structures

A **time series data structure** is a collection of elements with a timestamp. It is similar to a map in other programming languages. Time series data structures are often used to implement other data structures like time series.

READ HERE: https://redis.io/docs/data-types/timeseries/

## Pub/Sub

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

### Cli Commands

- [**Pub/Sub**](#pubsub)
    - [**9.1. SUBSCRIBE**](#91subscribe)
    - [**9.2. UNSUBSCRIBE**](#92unsubscribe)
    - [**9.3. PUBLISH**](#93publish)
    - [**9.4. PUBSUB**](#94pubsub)


#### 9.1.SUBSCRIBE

This command subscribes to the specified channels.

```bash

SUBSCRIBE notifications

Reading messages... (press Ctrl-C to quit)

1) "subscribe"

2) "notifications"

3) (integer) 1
```

#### 9.2.UNSUBSCRIBE

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

#### 9.3.PUBLISH

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

#### 9.4.PUBSUB

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

## Scale A Node.js Application With Redis

1. Step 1. Initialize a Node.js project.
- Copy the template what I already created for you.
- `npm i`
- replace the .env file with your own database credentials.
- `npm start` to run the project.
2. Third party api: https://jsonplaceholder.typicode.com/todos
- We will try to speed up the api response time using redis.
-  `npm i axios` to install axios.
3. Open server/src folder makes a new file todos.ts

```ts
import express from "express";
import axios from "axios";

const todos = express.Router();

todos.get("/todos", async (req, res) => {
  try {
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
    res.json(data);
  } catch (error:any) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default todos;

```

4. Open server/src/app.ts and add the route to the express app.

```ts
app.use("/api/v1/", todos);
```

5. now run `npm run dev` and go to http://localhost:5050/api/v1/todos to see the response.

6. I have already setup Morgan for logging for response times, however, you can open Postman and check the response times.
7. In the first fetching it takes 403ms to fetch the data from the api, and after multiple requests, it takes 120ms–351ms to fetch the data from the api.

8. Now try to implement caching using redis.
    - you can find the client.ts file in the server/src folder.
       ```ts 
        import Redis from "ioredis";
      
        const client = new Redis(
          {
           host: 'localhost', // replace with your host, if not localhost
           port: 6379  // replace with your port, if not 6379
          }
         );
        export default client;
      ```
    - Now open server/src/todos.ts and import the redis client.
      ```ts
       import client from "./client";
         
       todos.get("/todos", async (req, res) => {
            try {
              const todos = await client.get("todos");
              if (todos) {
                console.log("Fetching from redis");
                return res.json(JSON.parse(todos));
              }
              const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
              client.set("todos", JSON.stringify(data));
              console.log("Fetching from api");
              res.json(data);
            } catch (error:any) {
              console.error("Error fetching todos:", error.message);
              res.status(500).json({ error: "Internal Server Error" });
            }
       });
       
      ```
    - Now run `npm run dev` and go to http://localhost:5050/api/v1/todos to see the response.
    - In the first fetching it takes 403ms to fetch the data from the api, and after multiple requests, it takes 0ms–1ms to fetch the data from the redis.
    - you can also add `client.set("todos", JSON.stringify(data), "EX", 10)` to set the expiration time of the key.
    - Now open you redis-cli and run `keys *` to see the keys and `ttl todos` to see the expiration time of the key.
    - If you open redis-stack container, you can see the todos with data.
    - Now you can scale your application by adding multiple instances of the application and using redis to cache the data.



