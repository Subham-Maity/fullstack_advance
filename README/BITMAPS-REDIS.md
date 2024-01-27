
A **bitmap data structure** is a collection of bits. It is similar to an array in other programming languages. Bitmaps are often used to implement other data structures like sets and bloom filters.

##### Cli Commands

- [**Redis Bitmaps**](#redis-bitmaps)
    - [**7.1. SETBIT**](#71setbit)
    - [**7.2. GETBIT**](#72getbit)
    - [**7.3. BITCOUNT**](#73bitcount)
    - [**7.4. BITOP**](#74bitop)
    - [**7.5. BITPOS**](#75bitpos)
    - [**7.6. BITFIELD**](#76bitfield)


##### 7.1.SETBIT

This command sets the bit at the specified index in the bitmap to either 1 or 0.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0

SETBIT pings:2024-01-01-00:00 456 1

(integer) 0
```

##### 7.2.GETBIT

This command returns the value of the bit at the specified index in the bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


GETBIT pings:2024-01-01-00:00 123

(integer) 1
```

##### 7.3.BITCOUNT

This command returns the number of bits set to 1 in the bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


SETBIT pings:2024-01-01-00:00 456 1

(integer) 0

  
BITCOUNT pings:2024-01-01-00:00

(integer) 2
```

##### 7.4.BITOP

This command performs a bitwise operation between the bitmaps and stores the result in the destination bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


SETBIT pings:2024-01-01-00:00 456 1

(integer) 0


BITOP AND pings:2024-01-01-00:00 pings:2024-01-01-00:00 pings:2024-01-01-00:00

(integer) 2
```

##### 7.5.BITPOS

This command returns the index of the first bit set to 1 or 0 in the bitmap.

```bash

SETBIT pings:2024-01-01-00:00 123 1

(integer) 0


BITPOS pings:2024-01-01-00:00 1

(integer) 123
```

##### 7.6.BITFIELD

This command performs a bitwise operation between the bitmaps and stores the result in the destination bitmap.

```bash

BITFIELD pings:2024-01-01-00:00 INCRBY i5 100 1 GET u4 0

1) (integer) 0

2) (integer) 0

3) (integer) 0

4) (integer) 0
.....
```
