A **list data structure** is a collection of elements in the order they are inserted. It is similar to an array in other programming languages. The list data structure is often used to implement other data structures like queues and stacks.

##### List Operations

Here are some operations performed on a list:

| Operation | Element |
|-----------|---------|
| Push      | 1       |
| Push      | 2       |
| Push      | 3       |
| Pop       | 3       |
| Pop       | 2       |
| Pop       | 1       |


##### Cli Commands
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



##### 2.1.LPUSH
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

##### 2.2.RPUSH

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
###### Note

*Redis can be used to implement a **stack** data structure, which follows a Last In, First Out (LIFO) principle. You can use the `lpush` command to insert elements at the head of the list, and the `lpop` command to remove elements from the head of the list.*

###### Here's an example of how you can use Redis commands to implement a stack:

```bash
lpush user:1 "subham"
lpush user:1 "codexam"

lpop user:1  # Output: "codexam"
lpop user:1  # Output: "subham"
```

###### Visualization in Redis Commander

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

##### 2.3.LPOP

This command removes and returns the first element of the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

lpop user:1

"codexam"
```

##### 2.4.RPOP

This command removes and returns the last element of the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

rpop user:1

"subham"
```

##### 2.5.LLEN

This command returns the length of the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

llen user:1 

(integer) 2
```

##### 2.6.LRANGE

This command returns the specified range of elements from the list.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

lrange user:1 0 1

1) "codexam"

2) "subham"
```

##### 2.7.LINDEX

This command returns the element at the specified index.

```bash 
lpush user:1 "subham"

lpush user:1 "codexam"

lindex user:1 0

"codexam"
```

##### 2.8.LSET

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

##### 2.9.LINSERT

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

##### 2.10.LSET

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

##### 2.11.LTRIM

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

##### 2.12.LREM

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

##### 2.13.RPOPLPUSH

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


##### 2.14.BRPOP

This command is similar to `rpop`, but it blocks the connection until an element is available or the timeout is reached.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

brpop user:1 10

1) "user:1"

2) "codexam"
```

It will block the connection for 10 seconds and then return the element. If no element is available, it will return `nil`.


##### 2.15.BLPOP

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


##### 2.16.BRPOPLPUSH

This command is similar to `rpoplpush`, but it blocks the connection until an element is available or the timeout is reached.

```bash

lpush user:1 "subham"

lpush user:1 "codexam"

brpoplpush user:1 user:2 10

"subham"
```

It will block the connection for 10 seconds and then return the element. If no element is available, it will return `nil`.
