# ⫸ Introduction

This project offers a deep dive into advanced Node.js and TypeScript,
focusing on scalability and clean, production-ready code.
It also serves as a boilerplate for future projects,
with every line of code meticulously documented for easy understanding.

## ⫸ Levels

-  ### [✅READ HERE](README/NOTE.md)

---

## ⫸ Installation

- ### [✅READ HERE](README/START.md)

---


## ⫸ Steps

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
- Chapters
  - String Operations (cli and node.js)
    - `set name`
    - `get name`
    - `setnx`
    - `MSET`
    - `MGET`
    - `INCR`
    - `INCRBY`
    - `GETRANGE`
    - `SETRANGE`
    - `GETRANGE`
    - `STRLEN`
    - `APPEND`
    - `SETEX`
    - `SETNX`
    - `MSETNX`
    - `SETRANGE`
    - `GETRANGE`
    - `STRLEN`
    - `DECR`
    - `DECRBY`
    - `PSETEX`
  - `List Operations` (cli and node.js)
    - `LPUSH`(Stack & Queue Concept)
    - `RPUSH`(Stack & Queue Concept)
    - `LPOP`
    - `RPOP`
    - `LLEN`
    - `LRANGE`
    - `LINDEX`
    - `LINSERT`
    - `LSET`
    - `LTRIM`
    - `LREM`
    - `RPOPLPUSH`
    - `BLPOP`
    - `BRPOP`
    - `BRPOPLPUSH`
  - `Set Operations` (cli and node.js)
    - `SADD`
    - `SREM`
    - `SISMEMBER`
    - `SMEMBERS`
    - `SPOP`
    - `SRANDMEMBER`
    - `SMOVE`
    - `SCARD`
    - `SINTER`
    - `SUNION`
    - `SDIFF`
    - `SDIFF`
    - `SINTERSTORE`
    - `SUNIONSTORE`
    - `SDIFFSTORE`
    - `SSCAN`
  
  - `Hash Operations` (cli and node.js)
     - `HSET`
     - `HGET`
     - `HGETALL`
     - `HDEL`
     - `HEXISTS`
     - `HKEYS`
     - `HVALS`
     - `HLEN`
     - `HINCRBY`
     - `HINCRBYFLOAT`
     - `HMSET`
     - `HMGET`
     - `HSETNX`
     - `HSTRLEN`
     - `HSCAN`
  


