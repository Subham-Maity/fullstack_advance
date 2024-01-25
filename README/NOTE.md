## Introduction

If you’re familiar with Node.js basics, start by running the code. As you explore and read the comments, you’ll gradually understand how it works.

- Click on the header it will redirect to the respective codebase, download the code and run it.
___________

### [**1. Perfect Boilerplate For Starting The Project**](https://github.com/Subham-Maity/auth_advance/tree/2850177ad4eafe1679648ee9bf7140e7b6a1de5b)

  ⁙⫸ This boilerplate is perfect for starting a project without any `schema`, `controller`, `routes`, or `authentication`.


#### **Getting Started**:

1. **Setup**: Rename the `.env.example` to `.env` and replace the `MONGO_URL=""` with your own MongoDB URL.
2. **Installation**: Run `npm install` or `yarn install` to install the necessary dependencies.
3. **Running the Project**: Use `npm run dev` or `yarn dev` to start the project.

#### **Additional Information**:

  - If any dependency is missing, install it manually.
  - If any dependency needs to be updated, update it manually or use `npm outdated` or `yarn outdated` to check the outdated dependencies. Then use `npm update` or `yarn update` to update the dependencies.
  - You can change the port number in the `.env` file as per your requirements.

___________


### [**2. Cookie-based Proper Authentication with Server Token (Stateful)**](https://github.com/Subham-Maity/rest_advance/tree/98c41fb3375e4f0aa9a7f04e0d807582ca2aa54e)


⁙⫸ With Authentication + User Operations
#### **Understanding the Flow**:
- Receive an email and password from the user.
- Hash the password for security.
- Save the email and hashed password in the database.
- When the user logs in with their email and password, verify the credentials.
- If the credentials are valid, generate a session token.
- Send the session token to the client.
- The client stores the token and sends it back in the header for subsequent requests.
- For each request, verify the session token.
- If the token is valid, process the request and send the data to the client.

#### **Contents**:

- **User Schema (Mongoose)**: Includes `email`, `username`, and `authentication` (which consists of `password`, `salt`,
  and `sessionToken`).
- **User Type Defined**
- **Middleware**: This includes two types:
    - **Owner**: Ensures the user is the owner of the account.
    - **Authenticated**: Ensures the user is authenticated.
    - **Error Handler**: Handles the error.
- **Utils**: This includes crypto for salt and hash password and generate session token.
- **Controller**: This includes `auth` (with `register` and `login` methods) and `User` (
  with `getAllUser`, `updateUserById`, and `deleteUserById` methods).

#### **Routes**:

- **Auth**
    - `register`: POST request to `/api/v1/auth/register`
        - Example body:
      ```json
      {
        "email": "subham@gmail.com",
        "password": "Subham@123#86!GitHub_DeVeLoPeR",
        "username": "Subham"
      }
      ```
    - `login`: POST request to `/api/v1/auth/login`
        - Example body:
      ```json
      {
        "email": "subham@gmail.com",
        "password": "Subham@123#86!GitHub_DeVeLoPeR",
        "username": "Subham"
      }
      ```
- **User**
    - `getAllUser`: GET request to `/api/v1/users`. This is wrapped with
      the `authentication` middleware, so you need to log in first to get the data.
    - `updateUserById`: PATCH request to `/api/v1/users/{id}`. This is wrapped with
      the `authentication` and `owner` middleware, so you need to log in first to update the data.
        - Example body:
      ```json
      {
        "username": "XAM"
      }
      ```
    - `deleteUserById`: DELETE request to `/api/v1/users/{id}`. This is wrapped with
      the `authentication` and `owner` middleware, so you need to log in first to delete the data.


___________


### [**3. JWT-based Authentication with Access Tokens & Refresh Tokens (Stateless)**](https://github.com/Subham-Maity/fullstack_advance/tree/b103a3011692cbfa9620e8fa7e5b9f9af06292f9)

### **○** Frontend: [**Next.js**](https://nextjs.org/)
### **○** Backend: [**Express.js**](https://expressjs.com/)


#### **Introduction**:
- **Access Token**: A short-lived token that is used to access protected resources on behalf of the user.
- **Refresh Token**: A long-lived token that is used to refresh the access token when it expires.
- **JWT** - JWT is a string that has three parts separated by dots. Each part is a base64url encoded string of the header, payload, and signature.
  - JWT - `HEADER`.`PAYLOAD`.`SIGNATURE`
     
    - `HEADER` - "alg": "HS256", "typ": "JWT"
    - `PAYLOAD` - sessionID: "1234567890", "email": "subham@gmail.com", "username": "Subham"(Don't store sensitive data like password)
    - encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64')
    - `SIGNATURE` - crypto.createHmac('sha256', secret).update(encodedHeader + '.' + encodedPayload).digest('base64')
#### **Understanding the Flow**:

⁙⫸ With Authentication + User Operations

#### **Understanding the Flow**:
![JWT](../images/JWT.png)
- User logs in with their credentials (username, password, etc.).
- Server verifies the credentials. If they're valid, the server generates an Access Token and a Refresh Token.
- The Access Token is a short-lived token (usually about 15 minutes to 1 hour) that carries the user information necessary to access a resource.
- The Refresh Token is a long-lived token (usually about 2 weeks to 6 months) that's used to request new Access Tokens.
- The Server sends both tokens to the client.
- Client stores the tokens. The Access Token is used for making authenticated requests.
- When the Access Token expires, the client uses the Refresh Token to request a new Access Token.
- Server verifies the Refresh Token and issues a new Access Token (and possibly a new Refresh Token).
- If the Refresh Token is expired or invalid, the user will need to authenticate again to get a new pair of tokens.

#### **TOKEN Mechanism**:
-  ##### [✅READ HERE](./JWT_TOKEN.md)

#### **Instructions**:

You will get two folders[`Stateful` , `Stateless`] in `model`,`middleware`,`routes`,`utils` and `controller` folder. 
- **Stateful**: This is the cookie-based authentication with server token.
- **Stateless**: This is the JWT-based authentication with access token and refresh token.

*purpose* : To understand the difference between stateful and stateless authentication.

#### **Contents**:

- `Client`: This includes our frontend code using Next.js 14
- `Server`: Here you will get all the server-side code.

##### `Client`:
- Components 
  - **Username**
    - Formik Validation
    - Toast (initialValues, validate)
    - Error Handling (Yup)
    - Types (validation.ts)
    - Redux (userSlice)- For storing the username
    - Username Validation using API (Check if the username is already present in the database or not only authorized/register users from the database are permitted to proceed to the next page)

  - **Password**
    - Formik Validation
    - Toast (initialValues, validate)
    - Error Handling (Yup)
    - Types (validation.ts)
    - V1(Async Thunk and AXIOS ) and V2 (RTK Query and js-cookie and AXIOS)—For storing the access token and refresh token (Both implementations are correct, but V2 is the best practice)
  - **Recovery**
    - OTP to reset password
    - OTP verification

  - **Reset**
    - Formik Validation
    - Toast (initialValues, validate)
    - Error Handling (Yup)
    - Types (validation.ts)
    - Reset Password using API
    - Handle the error (API)
    - Handle the ResetSession (API)

  - **Register (Register User)**
    - Convert: convert the file to a Base64 string
    - Formik Validation
    - Toast (initialValues, validate , User Existence)
    - Error Handling (Yup)
    - Types (validation.ts)
    - Email Send API
    - Register User using API
    - Delete Profile Picture
    - Get a Profile Picture
    - Hook - useMutation (react-query)
    - Hook - useQuery (react-query)
    - S3 Bucket (AWS) (READ HERE - [S3 Bucket](./S3WITH_REGISTER.md))
  - **Profile**
    - Convert: convert the file to a Base64 string
    - Formik Validation
    - Toast (initialValues, validate)
    - Error Handling (Yup)
    - Types (validation.ts)
    - Refresh Token (Cookie) & Access Token (Redux Store)
    - Use RTK Query (react-query) for put request (update user data)
    - Use RTK Query (react-query) for get access token and refresh token
    - Redux Persist (Redux Toolkit)—For storing the access token when the user refreshes the page it will not log out the user
    - Username from token (JWT Decode) (Fetch Hook)

- **api** - Using Axios (Custom Hooks)
  - Authentication: For checking the user is authenticated or not
  - Auth: 
    - Login: Log in the user
    - Register: Register the user
    - Reset Password: Reset the password
  - Mail: 
    - Send Mail: Send mail to the user according to the user action
  - OTP: 
    - Generate OTP: Generate OTP for the user
    - Verify OTP: Verify the OTP 
  - User
    - Get User: Get the user data 
    - Update User: Update the user data
    - Delete Profile Picture: Delete the profile picture from the S3 bucket
    - Get Profile Picture: Get the profile picture from the S3 bucket 
- **REDUX** - Using Redux Toolkit
    - user-userSlice-For storing the username 
    - user-profilePicOwnerSlice-For storing the profile picture owner 
- **Hook**  
    - axios—for making the API call
    - fetch—useFetch (custom hook) for fetching user data
    - useMutation—useMutation (react-query) for updating the user data 
    - useQuery—useQuery (react-query) for fetching user data 
- **Middleware** - Protected Routes (User, Profile)
##### `Server`:  
- **User Type Defined**
- **User Schema (Mongoose):** Includes `username`, `password`, `email`, `firstName`, `lastName`, `mobile`, `address`, `profile`.
- **utils:** 
   - bcrypt—for hashing the password  
   - token - `jwtAccess` (create access token), `jwtRefresh` (create refresh token), `tokenEncrypt` (encrypt the token), `tokenDecrypt` (crupto for encrypt and decrypt the refresh token) , `tokenVerify` (verify the token) , `saveToken` (save the Refresh Token in the database) `jwtSign`(sign the token) , `jwtVerify`(verify the token)...  [more](./JWT_TOKEN.md)  
   - mail - `sendMail` (send mail to the user)(nodemailer) normal mail and template mail 
   - gmail-smtp - `sendGMail` (send mail to the user)(nodemailer) normal mail and template mail
   - gmail0Auth - `sendGMail0Auth` (send mail to the user)(nodemailer) normal mail and template mail - Check all the steps in [0AuthSetps.md](./0AuthSetps.md)
- **Middleware**: 
   - **Owner**: Ensures the user is the owner of the account.
   - **Authenticated**: Ensures the user is authenticated and the token is valid.
   - **Error Handler**: Handles the error.
- **Controller**: This includes 
   - `auth` - `register`(register a user), `login`(log in a user), `generateAccessTokenHandler`(Refresh Token Generate), `logoutHandler`(Clear token),`verifyUser`(verify if the user exists in the database before login), checkUserExistence (check if the user exists in the database)
   - `user` -  `getUser`(get user data without a password), `updateUser`(update user data)
   - `OTP` - `generateOTP`(Generate OTP), `verifyOTP`(Verify the OTP)
- **Routes**:
    - **Auth**
      - `register`: POST request to `/api/v2/auth/register`
      - Example body:
      ```json
               {
                 "username" : "codexam_123",
                 "password" : "Codexam@123",
                 "email": "subham@codexam.com",
                 "firstName" : "Subham",
                 "lastName": "Maity",
                 "mobile": "1234567890",
                 "address" : "india",
                 "profile": ""
                }
      ```
      - `login`: POST request to `/api/v2/auth/login` wrap with `verifyUser` controller
      - Example body:
      ```json
              {
               "username" : "codexam_123",
               "password" : "Codexam@123"
               }
      ```
      - `reset password`: PUT request to `/api/v2/auth/resetPassword` wrap with `verifyUser` controller 
      - But before that you have to generate OTP and verify it then you can reset the password
      - `api/v2/auth/generateOTP?username=codexam_123`
      - `api/v2/auth/verifyOTP?username=codexam_123&code=427638`
      - Then you can reset the password
      - Example body:
      
      ```json
           {
            "username" : "codexam_123",
            "password" : "Codexam@123"
            }
      ```
  - **Auth/VerifyUser**
      - `POST request to /api/v2/auth/verifyUser` 
      - Example body:
      ```json
             {
               "username" : "codexam_123"
             }
      ```
      - `logout`: DELETE request to `/api/v2/auth/token`
      - Example body:
      ```json
             {
               "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
             }
      ```  
  - **Auth/Token**
      - `get refressToken`: POST request to `/api/v2/auth/token`
      - Example body:
      ```json
             {
               "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
             }
      ```
      - `logout`: DELETE request to `/api/v2/auth/token`
      - Example body:
      ```json
             {
               "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
             }
      ```
  - **User**
      - `get User`: GET request to `/api/v2/user/codexam_123` here `codexam_123` is the username
      - `update User`: PUT request to `/api/v2/updateuser?id=658ec47dcb30d4ea193d457a` here `658ec47dcb30d4ea193d457a` is the id wrap with `authenticated` and `owner` middleware
      - Example body:
      ```json
             {
               "username" : "codexam_123",
               "password" : "Codexam@123",
               "email": "Subham@Codexam.com"
             }
            
      ```
  - **Auth/OTP**
    - `get OTP`: GET request to `/api/v2/auth/generateOTP?username=codexam_123` here `codexam_123` is the username you have to pass in the query parameter and wrap with `authenticated` middleware
    - `verify OTP`: GET request to `http://localhost:5050/api/v2/auth/verifyOTP?username=codexam_123&code=427638` here `codexam_123` is the username and `427638` is the OTP you have to pass in the query parameter 
        and wrap with `authenticated` middleware
  - **Auth/createResetSession**
    - `get Session Flag`: GET request to `/api/v2/auth/createResetSession` you will get flag `true` or `false` if the flag is `true` then you can reset the password
  - **MAIL/EMAIL**
      - `send mail`: POST request to `/api/v2/mail-v1/registerMail`
      - Example body:
      ```json
              {
               "username" : "codexamA_123",
               "userEmail" : "codexam@xam.com",
               "text" : "New User Registered",
               "subject" : "New User Registered"
              }
      ```  
  - **MAIL/GMAIL/SMTP**
   - `Go to https://myaccount.google.com/security`
   - `Enable 2-Step Verification`
   - `Create App Password https://myaccount.google.com/apppasswords`
      - `send mail`: POST request to `/api/v2/mail-v1/registerGMail`
      - Example body:
      ```json
              {
               "username" : "codexamA_123",
               "userEmail" : "codexam@xam.com",
               "text" : "New User Registered",
               "subject" : "New User Registered"
              }
      ```          
  - **MAIL/GMAIL/0Auth**
    Check all the steps in [0AuthSetps.md](./0AuthSetps.md)
      - `send mail`: POST request to `/api/v2/mail-v1/registerGMail0Auth`
      - Example body:
      ```json
              {
               "username" : "codexamA_123",
               "userEmail" : "codexam@xam.com",
               "text" : "New User Registered",
               "subject" : "New User Registered"
              }
      ```      
  - **S3 Bucket**
    Check all the steps in [S3 Setup](./S3Steps.md) and also understand how I set up the S3 bucket in the frontend and backend [Here](./S3WITH_REGISTER.md)
  
    - `Get Owner Profile Pic`: POST request to `/api/v2/storage-v1/s3/get-owner-image`
    - post with user's profile data
    - Example body:
      ```json
       {
         "requestedImageName":"4515e1be62e98"
       }
      ```    
    - `Get Owner Profile Pic`: POST request to `/api/v2/storage-v1/s3/get-owner-image`
    - post with user's profile data
    - Example body:
      ```json
       {
         "requestedImageName":"4515e1be62e98"
       }
      ``` 
    - `Delete Owner Profile Pic`: POST request to `/api/v2/storage-v1/s3/remove-owner-image`
    - post with user's profile data
    - Example body:
      ```json
       {
         "requestedImageName":"4515e1be62e98"
       }
      ```
    - `Register User Profile Pic`: POST request to `/api/v2/storage-v1/s3/images`
      -  post with image data in binary format
    - `Get User Profile Pic`: GET request to `/api/v2/storage-v1/s3/images`
      -  Give you last uploaded image key
    - `Delete All Keys`: DELETE request to `/api/v2/storage-v1/s3/clear-database-s3`
      -  Delete all the keys from the database

### [**4. Implementing Role-based Two-Factor Authentication with NextAuth**]()

Sure, here's a more structured and detailed version of your content:


### [**5. Redis**]()

#### Introduction:
Redis is an open-source, in-memory key-value data store. It is versatile and can be used as a database, cache, and message broker. Redis supports various data structures such as Strings, Hashes, Lists, Sets, and more. It provides high availability via Redis Sentinel and automatic partitioning across multiple Redis nodes with Redis Cluster.

#### Installation:

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

#### Redis CLI Commands:

1. Run `docker ps` in the terminal to check the running container and copy the container id.
2. Use `docker exec -it <container_id> bash` to open the bash terminal of the container. For example: `docker exec -it 7b7e bash`.
3. Type `redis-cli` to open the Redis CLI terminal.
4. Type `ping` to check if the Redis server is running. If you get `PONG`, then the server is running.

#### 1.String Data Structure:

##### Cli Commands
- [**String Data Structure**](#1string-data-structure)
  - [**1.1. set name**](#11-set-name)
  - [**1.2. get name**](#12-get-name)
  - [**1.3. setnx**](#13-setnx-)
  - [**1.4. MSET**](#14-mset-)
  - [**1.5. MGET**](#15-mget-)
  - [**1.6. INCR**](#16--incr-)
  - [**1.7. INCRBY**](#17--incrby-)
  - [**1.8. GETRANGE**](#18-getrange-)
  - [**1.9. SETRANGE**](#19--setrange-)
  - [**1.10. GETRANGE**](#110--getrange-)
  - [**1.11. STRLEN**](#111--strlen-)
  - [**1.12. APPEND**](#112--append--)
  - [**1.13. SETEX**](#113--setex)
  - [**1.14. SETNX**](#114--setnx)
  - [**1.15. MSETNX**](#115--msetnx)
  - [**1.16. SETRANGE**](#116--setrange)
  - [**1.17. GETRANGE**](#117--getrange)
  - [**1.18. STRLEN**](#118--strlen)
  - [**1.19. DECR**](#119-decr-)
  - [**1.20. DECRBY**](#120-decrby-)
  - [**1.21. GETSET**](#121-getset-)
  - [**1.22. MGET**](#122-mget-)
  - [**1.23. PSETEX**](#123-psetex-)


##### 1.1. set name
Type `set name "subham"` to set a key-value pair in the Redis server.
##### 1.2. get name

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
##### 1.3 setnx 
set if not exists(nx)
```bash
set user:1 "subham" nx
```
if you don't use nx, then it will overwrite the value
```bash
set user:1 "codexam"
```

##### 1.4 MSET 
set multiple values

```bash
mset user:1 "subham" user:2 "codexam" msg:1 "hello" msg:2 "hi"
```

##### 1.5 MGET  
get multiple values

```bash
mget user:1 user:2 msg:1 msg:2

1) "subham"
2) "codexam"
3) "hello"
4) "hi"
```
##### 1.6  INCR 
increment the value by 1

```bash
set user:1 10

incr user:1

(integer) 11
```

##### 1.7  INCRBY 
increment the value by 5

```bash
set user:1 10

incrby user:1 5

(integer) 15
```
Note: By default a single Redis string can be a maximum of 512MB in size.

##### 1.8 GETRANGE 
get the value from the range(SUBSTRING)

```bash
set user:1 "subham"

getrange user:1 0 3

"subh"
```
##### 1.9  SETRANGE 
set the value from the range(SUBSTRING)

```bash
set user:1 "subham"

setrange user:1 0 "codexam"

(integer) 7

get user:1

"codexam"
```

##### 1.10  GETRANGE 
get the value from the range(SUBSTRING)

```bash
set user:1 "subham"

getrange user:1 0 3

"subh"
```

##### 1.11  STRLEN 
get the length of the value

```bash
set user:1 "subham"

strlen user:1

(integer) 6
```

##### 1.12  APPEND -
append the value

```bash
set user:1 "subham"

append user:1 " codexam"

(integer) 14

get user:1

"subham codexam"
```

##### 1.13  SETEX
set the value with expiration time (in seconds)


```bash
setex user:1 10 "subham"

(integer) 1

get user:1

"subham"

get user:1

(nil)
```

##### 1.14  SETNX
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

##### 1.15  MSETNX
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

##### 1.16  SETRANGE
set the value from the range(SUBSTRING)

```bash

set user:1 "subham"

setrange user:1 0 "codexam"

(integer) 7

get user:1

"codexam"
```

##### 1.17  GETRANGE
get the value from the range(SUBSTRING)

```bash

set user:1 "subham"

getrange user:1 0 3

"subh"
```


##### 1.18  STRLEN
get the length of the value

```bash

set user:1 "subham"

strlen user:1

(integer) 6
```

##### 1.19  **DECR**: 
This command decreases the value of a key by 1. If the key does not exist, it is set to -1.

```bash
set user:1 10

decr user:1

(integer) 9
```

##### 1.20  **DECRBY**: 
This command decreases the value of a key by the given number. If the key does not exist, it is set to negative the given number.

```bash
set user:1 10

decrby user:1 5

(integer) 5
```

##### 1.21 **GETSET**: 
This command sets the value of a key and returns its old value.

```bash
set user:1 "subham"

getset user:1 "codexam"

"subham"
```

##### 1.22 **MGET**: 
This command gets the values of all the given keys.

```bash
mget user:1 user:2

1) "codexam"
2) "subham"
```

##### 1.23 **PSETEX**: 
This command sets the value and expiration in milliseconds of a key.

```bash
psetex user:1 10000 "subham"

(integer) 1

get user:1

"subham"

get user:1

(nil)
```


##### Nodejs Setup

1. open the 5.redis folder and run the following command
```bash
npm run string
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

Here you will get all the commands for string data structure in redis





