# ⫸ Introduction

This project offers a deep dive into advanced Node.js, TypeScript and Frontend with Next.js,
Tailwind CSS, Redux Toolkit, RTK Query, and Validation, and so on.
focusing on scalability and clean, production-ready code.
It also serves as a boilerplate for your future projects,
with every line of code meticulously documented for easy understanding.

## ⫸ Notes on the Project

-  ### [✅READ HERE](README/NOTE.md)

---


## ⫸ You will learn the following things in this project 

Before starting the project, you should have a basic understanding of the following:
`0.1` & `0.2` are not part of the project, but they are essential for the project. 

### 1. [Setting Up the Project Boilerplate](README/NOTE.md#1-perfect-boilerplate-for-starting-the-project)
- Error Handling
- Logger
- Swagger
- CORS
- Helmet
- Cookie-parser
- Dotenv
- Body-parser
- Morgan
- Mongoose
- MongoDB setup
- Proper script setup
- UUID
- Compression

### 2. [Implementing Cookie-based Authentication with Server Token (Stateful)](README/NOTE.md#2-cookie-based-proper-authentication-with-server-token-stateful)
- User Registration and Login
- User Profile: Get, Update, Delete
- Authentication Checks: Is Authenticated? Is the Owner?
- Crypto: Password Hashing, Password Salting
- Session Token: Cookie
- API Versioning

### 3. [Implementing JWT-based Authentication with Access Tokens & Refresh Tokens (Stateless)](README/NOTE.md#3-jwt-based-authentication-with-access-tokens--refresh-tokens-stateless)
#### Frontend - Next.js

- Tailwind CSS
- Axios
- Convert File to Base64
- Clsx
- Tailwind-merge
- Redux—Proper Setup (Redux Toolkit)
- Toast
- Validation 
  - Form Validation (Yup & Formik) correct format of email, password, etc. 
  - Only authorized/register users from the database are permitted to proceed to the next page.
- Custom Hooks
- Custom API
- RTK Query & js-cookie: Best Practices for Access Token Storage and Refresh Token
- AsyncThunk
- Refresh Token (Cookie) & Access Token (Redux Store)
- REDUX Persists for holding the state of the user even after the page refreshes.
- Protected Routes

#### Backend - Node.js
- JWT: Access Token, Refresh Token
- Bcrypt: Password Hashing, Password Salting
- Secure Authentication Mechanism
- Authentication Checks: Is Authenticated? Is the Owner?
- Crypto: Password Hashing, Password Salting
- Local Storage (Variables)
- Proper Error Handler
- User Authentication: Register, Login, Reset Password
- User Profile: Get, Update
- OTP: Generate, Verify
- Authenticated User Only
- Session: Creation, Destroy
- Generate Access Token using Refresh Token
- Logout
- Email: Normal Mail (Nodemailer , mailgen)
- Email: Gmail Basic Auth (SMTP)
- Email: Gmail Better (OAuth2)
- Sharp (Media Processing)
- Multer (File Upload)
- AWS S3 (File Upload)

https://github.com/Subham-Maity/CodeXamAsset/assets/97989643/a7a17b45-1db4-4cd2-82f2-1a3de680010f


### 4. [Implementing Role-based Two-Factor Authentication with NextAuth](README/NOTE.md#4-implementing-role-based-two-factor-authentication-with-nextauth)
- Tailwind CSS
- Shadcn/ui
- dark mode/light mode
- Parallel Routing (Intercepting Routes)
- Modal
- Zod(Schema Validation)


### 5. [REDIS](README/NOTE.md#5-redis)
- What is Redis?
- How to set up Redis with docker? (redis-stack and redis-client)
- CLI commands for Redis
- Redis with Node.js
- Data Types
  - **String Operations (cli and node.js)** →
    `set name`, `get name`, `setnx`, `MSET`, `MGET`, `INCR`, `INCRBY`, `GETRANGE`, `SETRANGE`, `GETRANGE`, `STRLEN`, `APPEND`, `SETEX`, `SETNX`, `MSETNX`, `SETRANGE`, `GETRANGE`, `STRLEN`, `DECR`, `DECRBY`, `PSETEX`
  - **List Operations (cli and node.js)**  →
    `LPUSH` (Stack & Queue Concept), `RPUSH` (Stack & Queue Concept), `LPOP`, `RPOP`, `LLEN`, `LRANGE`, `LINDEX`, `LINSERT`, `LSET`, `LTRIM`, `LREM`, `RPOPLPUSH`, `BLPOP`, `BRPOP`, `BRPOPLPUSH`
  - **Set Operations (cli and node.js)** →
    `SADD`, `SREM`, `SISMEMBER`, `SMEMBERS`, `SPOP`, `SRANDMEMBER`, `SMOVE`, `SCARD`, `SINTER`, `SUNION`, `SDIFF`, `SDIFF`, `SINTERSTORE`, `SUNIONSTORE`, `SDIFFSTORE`, `SSCAN`
  - **Hash Operations (cli and node.js)**  →
    `HSET`, `HGET`, `HGETALL`, `HDEL`, `HEXISTS`, `HKEYS`, `HVALS`, `HLEN`, `HINCRBY`, `HINCRBYFLOAT`, `HMSET`, `HMGET`, `HSETNX`, `HSTRLEN`, `HSCAN` 
  - **Sorted Set Operations (cli and node.js)**  →
     `ZADD`, `ZREM`, `ZSCORE`, `ZRANGE`, `ZREVRANGE`, `ZRANGEBYSCORE`, `ZREVRANGEBYSCORE`, `ZCARD`, `ZCOUNT`, `ZINCRBY`, `ZLEXCOUNT`, `ZRANGEBYLEX`, `ZREVRANGEBYLEX`, `ZREMRANGEBYLEX`, `ZREMRANGEBYRANK`, `ZREMRANGEBYSCORE`, `ZUNIONSTORE`, `ZINTERSTORE`, `ZSCAN`, `ZPOPMIN`, `ZPOPMAX`, `BZPOPMIN`, `BZPOPMAX`, `ZRANK`
     
  - **REDIS STREAMS OPERATIONS (cli and node.js)**  →
    `XADD`, `XLEN`, `XRANGE`, `XREVRANGE`, `XREAD`, `XREADGROUP`, `XGROUP`, `XACK`, `XCLAIM`, `XDEL`, `XTRIM`, `XINFO`, `XSETID`, `XREWRITE`
  - **Bitmaps Operations (cli and node.js)**  →
    `GEOADD`, `GEOPOS`, `GEODIST`, `GEORADIUS`, `GEORADIUSBYMEMBER`, `GEOHASH`, `GEOSEARCH`, `GEOSEARCHSTORE`
     
- Redis Pub/Sub
- Scale A Node.js Application with Redis  

### 5. [NestJS](README/NOTE.md#6-nestjs)

- 1. Basic Understanding and Setup
  - 1.1 Let's make a module
    - 1. Create a Basic Module
    - 2. Define the Module
    - 3. Use the Module
    - 4. Create More Modules
    - 5. Create a `bookmarks` Module
    - 6. Final Structure
  - 1.2 Let's make a basic controller and service
    - 1. Create the Controller and Service files
    - 2. Define the Controller
    - 3. Define the Service
    - 4. Register the Controller and Service in the Module
    - 5. Inject the Service into the Controller
    - 6. Use the Service's methods in the Controller
- 2. Setting Up the Auth Controller
  - 2.1 Creating Basic Endpoints
- 3. Setting up DB with docker(Prisma)
- 4. Setting up TypeORM with NestJS (Prisma)
- 5. Understanding DTOs and Class-Validator in NestJS
  - 5.1 Installing Class-Validator
  - 5.2 Creating and Validating DTOs
  - 5.3 Using DTOs in Controllers
  - 5.4 Global Validation Pipe
- 6. Implementing Signup Logic with Argon2 and Prisma
  - 6.1 Installing Argon2
  - 6.2 Basic Signup Logic
  - 6.3 Handling Unique Email Validation
  - 6.4 Handling Errors
  - 6.5 Creating a Custom Exception Filter
- 7. Implementing Login Logic
- 8. Automate postgres restart & prisma migrations
- 9. NestJs config module
- 10. Passport & JWT module setup
  - 10.1 Basic Setup of Passport & JWT
  - 10.2 Let's setup strategy
- 11. NestGuard
  - 11.1 Protecting Routes with Guards
  - 11.2 Providers
  - 11.3 Return User Payload
  - 11.4 JWT Guard
- 12. Custom Param Decorator
  - 12.1 Creating a GetUser Decorator
  - 12.2 Http Decorator
- 13. E2E Testing
- 14. Setting Up Test Database
- 15. Dotenv for Development and Testing
- 16. Database Tear Down
  - 16.1 Cleaning the Database
  - 16.2 Database Tear Down in E2E Tests
  - 16.3 Create the test
- 17. Auth E2E Testing with Pactum
  - 17.1 Signup test
  - 17.2 Signin test
  - 17.3 Error handling
  - 17.4 Multiple Error handling
  - 17.5 Storing the token
- 18. User E2E Testing with Pactum
  - 18.1 Get User with Bearer Token
  - 18.2 Edit User with Bearer Token
    - 18.2.1 DTO for Edit User
    - 18.2.2 Service for Edit User
    - 18.2.3 Controller for Edit User
    - 18.2.4 Pactum Test for Edit User
> **⭐ Let's Revise the concepts and implement bookmarks [CRUD]**
- 19. Bookmarks Crud with Testing E2E