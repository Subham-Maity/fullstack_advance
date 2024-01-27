
A **set data structure** is a collection of unordered, unique elements. It is similar to a set in mathematics. The set data structure is often used to implement other data structures like queues and stacks.

##### Set Operations

Here are some operations performed on a set:

| Operation | Element |
|-----------|---------|
| Add       | 1       |
| Add       | 2       |
| Add       | 3       |
| Remove    | 3       |
| Remove    | 2       |
| Remove    | 1       |

##### Cli Commands
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

##### 3.1.SADD

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

##### 3.2.SREM

This command removes the specified member from the set.

```bash
sadd user:1 "subham"
sadd user:1 "codexam"

srem user:1 "subham"

smembers user:1

1) "codexam"
```

##### 3.3.SISMEMBER

This command checks if the specified member is present in the set.

```bash
sadd user:1 "subham"
sadd user:1 "codexam"

sismember user:1 "subham"

(integer) 1
```

##### 3.4.SMEMBERS

This command returns all the members of the set.

```bash

sadd user:1 "subham"
sadd user:1 "codexam"

smembers user:1

1) "subham"

2) "codexam"
```

##### 3.5.SPOP

This command removes and returns a random member from the set.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

spop user:1

"codexam"
```

##### 3.6.SRANDMEMBER

This command returns a random member from the set.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

srandmember user:1

"codexam"
```

##### 3.7.SMOVE

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


##### 3.8.SCARD

This command returns the number of members in the set.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

scard user:1 


(integer) 2
```

##### 3.9.SINTER

This command returns the intersection of all the sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sinter user:1 user:2

1) "subham"
```


##### 3.10.SUNION

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

##### 3.11.SDIFF

This command returns the difference between the first set and all the other sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sdiff user:1 user:2

1) "codexam"
```

##### 3.12.SINTERSTORE

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

##### 3.13.SUNIONSTORE

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


##### 3.14.SDIFFSTORE

This command stores the difference between the first set and all the other sets specified.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sadd user:2 "xamcodexam"

sdiffstore user:3 user:1 user:2

(integer) 1

```

##### 3.15.SSCAN

This command scans the set for members matching the specified pattern.

```bash

sadd user:1 "subham"

sadd user:1 "codexam"

sscan user:1 0 match "sub*"

1) "0"

2) 1) "subham"
```