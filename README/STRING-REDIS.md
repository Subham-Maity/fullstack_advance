
##### Cli Commands
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


##### 1.1.set name
Type `set name "subham"` to set a key-value pair in the Redis server.
##### 1.2.get name

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
##### 1.3.setnx
set if not exists(nx)
```bash
set user:1 "subham" nx
```
if you don't use nx, then it will overwrite the value
```bash
set user:1 "codexam"
```

##### 1.4.MSET
set multiple values

```bash
mset user:1 "subham" user:2 "codexam" msg:1 "hello" msg:2 "hi"
```

##### 1.5.MGET
get multiple values

```bash
mget user:1 user:2 msg:1 msg:2

1) "subham"
2) "codexam"
3) "hello"
4) "hi"
```
##### 1.6.INCR
increment the value by 1

```bash
set user:1 10

incr user:1

(integer) 11
```

##### 1.7.INCRBY
increment the value by 5

```bash
set user:1 10

incrby user:1 5

(integer) 15
```
Note: By default a single Redis string can be a maximum of 512MB in size.

##### 1.8.GETRANGE
get the value from the range(SUBSTRING)

```bash
set user:1 "subham"

getrange user:1 0 3

"subh"
```
##### 1.9.SETRANGE
set the value from the range(SUBSTRING)

```bash
set user:1 "subham"

setrange user:1 0 "codexam"

(integer) 7

get user:1

"codexam"
```

##### 1.10.GETRANGE
get the value from the range(SUBSTRING)

```bash
set user:1 "subham"

getrange user:1 0 3

"subh"
```

##### 1.11.STRLEN
get the length of the value

```bash
set user:1 "subham"

strlen user:1

(integer) 6
```

##### 1.12.APPEND
append the value

```bash
set user:1 "subham"

append user:1 " codexam"

(integer) 14

get user:1

"subham codexam"
```

##### 1.13.SETEX
set the value with expiration time (in seconds)


```bash
setex user:1 10 "subham"

(integer) 1

get user:1

"subham"

get user:1

(nil)
```

##### 1.14.SETNX
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

##### 1.15.MSETNX
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

##### 1.16.SETRANGE
set the value from the range(SUBSTRING)

```bash

set user:1 "subham"

setrange user:1 0 "codexam"

(integer) 7

get user:1

"codexam"
```

##### 1.17.GETRANGE
get the value from the range(SUBSTRING)

```bash

set user:1 "subham"

getrange user:1 0 3

"subh"
```


##### 1.18.STRLEN
get the length of the value

```bash

set user:1 "subham"

strlen user:1

(integer) 6
```

##### 1.19.DECR
This command decreases the value of a key by 1. If the key does not exist, it is set to -1.

```bash
set user:1 10

decr user:1

(integer) 9
```

##### 1.20.DECRBY
This command decreases the value of a key by the given number. If the key does not exist, it is set to negative the given number.

```bash
set user:1 10

decrby user:1 5

(integer) 5
```


##### 1.21.PSETEX
This command sets the value and expiration in milliseconds of a key.

```bash
psetex user:1 10000 "subham"

(integer) 1

get user:1

"subham"

get user:1

(nil)
```