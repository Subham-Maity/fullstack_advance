
Redis Streams is a new feature in Redis 5.0 that allows you to store multiple fields and values in a single key. It is similar to a log file in other programming languages. Redis Streams is often used to implement other data structures like queues and stacks.

##### Cli Commands

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


##### 6.1.XADD

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

##### 6.2.XLEN

This command returns the number of messages in the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"

xlen user:1

(integer) 3
```


##### 6.3.XRANGE

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


##### 6.4.XREVRANGE

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


##### 6.5.XREAD

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

##### 6.6.XREADGROUP


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


##### 6.7.XGROUP


This command creates a consumer group.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"

xadd user:1 * name "xamcodexam" role "admin"


xgroup create user:1 user:1 0-0 mkstream

OK
```

##### 6.8.XACK

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

##### 6.9.XCLAIM

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

##### 6.10.XDEL

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

##### 6.11.XTRIM

This command trims the specified messages in the stream.

```bash

xadd user:1 * name "subham" role "admin"

xadd user:1 * name "codexam" role "admin"


xadd user:1 * name "xamcodexam" role "admin"

xtrim user:1 maxlen 2

(integer) 1
```


##### 6.12.XINFO

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

##### 6.13.XSETID

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

##### 6.14.XREWRITE

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
