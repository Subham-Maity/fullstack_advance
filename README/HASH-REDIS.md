
A **hash data structure** is a collection of key-value pairs. It is similar to a hash table in other programming languages. The hash data structure is often used to implement other data structures like queues and stacks.


##### Cli Commands

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

##### 4.1.HSET

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

##### 4.2.HGET

This command returns the value of the specified field in the hash.

```bash

hset user:1 name "subham"

hset user:1 email "

hget user:1 name

"subham"
```

##### 4.3.HGETALL

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

##### 4.4.HDEL

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

##### 4.5.HEXISTS

This command checks if the specified field exists in the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hexists user:1 role

(integer) 1
```

##### 4.6.HKEYS

This command returns all the fields of the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hkeys user:1

1) "name"

2) "role"
```

##### 4.7.HVALS

This command returns all the values of the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hvals user:1

1) "subham"

2) "admin"
```

##### 4.8.HLEN

This command returns the number of fields in the hash.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hlen user:1

(integer) 2
```

##### 4.9.HINCRBY

This command increments the specified field by the specified value.

```bash

hset user:1 age 20

hincrby user:1 age 5

(integer) 25
```

##### 4.10.HINCRBYFLOAT

This command increments the specified field by the specified value.

```bash

hset user:1 age 20

hincrbyfloat user:1 age 5.5

"25.5"
```

##### 4.11.HMSET

This command sets the specified fields to their respective values in the hash.

```bash

hmset user:1 name "subham" role "admin"

hgetall user:1

1) "name"

2) "subham"

3) "role"

4) "admin"
```

##### 4.12.HMGET

This command returns the values of the specified fields in the hash.

```bash

hmset user:1 name "subham" role "admin"

hmget user:1 name role

1) "subham"

2) "admin"
```

##### 4.13.HSETNX

This command sets the specified field to the specified value if the field does not exist in the hash.

```bash

hsetnx user:1 name "subham"

hsetnx user:1 name "codexam"

(integer) 0

```

##### 4.14.HSTRLEN

This command returns the length of the value of the specified field in the hash.

```bash

hset user:1 name "subham"

hstrlen user:1 name

(integer) 6
```

##### 4.15.HSCAN

This command scans the hash for fields matching the specified pattern.

```bash

hset user:1 name "subham"

hset user:1 role "admin"

hscan user:1 0 match "na*"

1) "0"

2) 1) "name"

   2) "subham"
```

#### Sorted Set Operations with Redis

A **sorted set data structure** is a collection of unique elements sorted by a score. It is similar to a sorted list in other programming languages. Priority queues are often implemented using a sorted set data structure.

##### Sorted Set Operations

Here are some operations performed on a sorted set:

| Operation | Element | Score |
|-----------|---------|-------|
| Add       | 1       | 1     |
| Add       | 2       | 2     |
| Add       | 3       | 3     |
| Remove    | 3       | 3     |
| Remove    | 2       | 2     |
| Remove    | 1       | 1     |

##### Cli Commands

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


##### 5.1.ZADD

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


##### 5.2.ZREM

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

##### 5.3.ZSCORE


This command returns the score of the specified member in the sorted set.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zscore user:1 "subham"

"1"
```

##### 5.4.ZRANGE

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

##### 5.5.ZREVRANGE

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

##### 5.6.ZRANGEBYSCORE

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

##### 5.7.ZREVRANGEBYSCORE

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

##### 5.8.ZCARD

This command returns the number of elements in the sorted set.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"


zadd user:1 3 "xamcodexam"

zcard user:1

(integer) 3
```

##### 5.9.ZCOUNT

This command returns the number of elements in the sorted set with a score between the specified minimum and maximum.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zcount user:1 1 2

(integer) 2
```

##### 5.10.ZINCRBY

This command increments the score of the specified member in the sorted set by the specified value.

```bash

zadd user:1 1 "subham"

zincrby user:1 2 "subham"


zrange user:1 0 -1 withscores

1) "subham"

2) "3"
```

##### 5.11.ZLEXCOUNT

This command returns the number of elements in the sorted set between the specified minimum and maximum.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"

zlexcount user:1 - +

(integer) 3
```

##### 5.12.ZRANGEBYLEX

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

##### 5.13.ZREVRANGEBYLEX

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

##### 5.14.ZREMRANGEBYLEX

This command removes the specified range of elements from the sorted set by lexicographical order.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"

zadd user:1 3 "xamcodexam"


zremrangebylex user:1 - +

(integer) 3
```

##### 5.15.ZREMRANGEBYRANK

This command removes the specified range of elements from the sorted set by index.

```bash

zadd user:1 1 "subham"

zadd user:1 2 "codexam"


zadd user:1 3 "xamcodexam"

zremrangebyrank user:1 0 1

(integer) 2
```

##### 5.16.ZREMRANGEBYSCORE

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

##### 5.17.ZUNIONSTORE

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

##### 5.18.ZINTERSTORE

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

##### 5.19.ZSCAN

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
##### 5.20.ZRANK

This command returns the rank of the specified member in the sorted set.

```bash

zadd user:1 1 "subham"
zadd user:1 2 "codexam"

zrank user:1 "subham"

(integer) 0
```


*Note: Normally, sets are used to store unique elements. However, sorted sets allow you to store duplicate elements. This is because each element in a sorted set is associated with a score, which makes it unique and normal sets are unordered.* 

