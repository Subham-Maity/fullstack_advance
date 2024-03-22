# Same server 1-2-3.auth-cookie-based-and-jwt

> We will use `this same server` and implement the bullmq



## 1. Problem 

- When the User registers, we will send a welcome email to the user 

`authController.ts` - `controllers/authController.ts`
```ts

/** REGISTER USER */

/** POST: http://localhost:5050/api/v2/auth/register
 * @param : {
 "username" : "codexam_123",
 "password" : "Codexam@123",
 "email": "subham@codexam.com",
 "firstName" : "Subham",
 "lastName": "Maity",
 "mobile": "1234567890",
 "address" : "india",
 "profile": ""
 }
 */
export const register = catchAsyncError(
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const { username, password, profile, email } = req.body;
        if (!password) {
            return next(new AppError("Password is required", 400));
        }

        try {
            const userExists = await userExistsByUsername(username);
            if (userExists) {
                return next(new AppError("Username already exists", 400));
            }
            const emailExists = await userExistsByEmail(email);
            if (emailExists) {
                return next(new AppError("Email already exists", 400));
            }
            const hashedPassword = await bcryptHash(password, CUSTOM_SALT_ROUNDS);
 
            const user = await saveUser({
                username,
                password: hashedPassword,
                profile: profile || "", 
                email,
            });
            //_____________________________________
           // send welcome email to user 
          //_____________________________________
            const emailBody = {
                body: {
                    name: username,
                    intro: "Welcome to our community!",
                },
            };
            await MailController.sendMail(email, "Welcome!", emailBody);
            //_____________________________________
            // end
            //_____________________________________
            return res.status(201).send({
                message: "User created successfully",
                user,
            });
        } catch (error: any) {
            if (error.code === 11000) {
                return next(new AppError("Unable to register user", 500));
            } else {
                return next(new AppError("Unable to register user", 500));
            }
        }
    },
);
```
`mailController.ts` - `utils/stateless/mailer/Gmail-0auth2/mailController.ts`
```ts

// mailController.ts
import { Request, Response } from "express";
import MailService from "./MailService";

class MailController {
  async sendMail(userEmail: string, subject: string, emailBody: any) {
    try {
      await MailService.sendMail(userEmail, subject, emailBody);
      return { msg: "You should receive an email from us." };
    } catch (error) {
      return { error };
    }
  }
}

export default new MailController();
```

> Here problem we face is that, when we register a user, we send a welcome email using MailController. But this is a synchronous operation, and it will block the main thread. This is not a good practice as it will slow down the response time of the server. We should use a queue to handle this operation asynchronously.

## 2. Solution

Let's try to solve this problem using `bullmq`
you can use different server for this implementation, but we will use the same server for this implementation 

- 1. First we will install the `bullmq` package using the following command:
```bash
npm install bullmq
```
- 2. Go to this website - https://console.aiven.io/account/a4a02c0b4ad3/project/maitysubham4041-866d/services/redis-3047504e/overview

- 3. Create a server and get the connection string. If you tested on the local machine, you can go to setting then click on the configure and `redis_ssl` disabled.
- 4. Go to overview and copy the

```handlebars
{
  "host": "redis-3047504e-xxxxxxx.aivencloud.com",
  "port": 20708
  "user": "avnadmin",
  "password": "xxxxxxx"
}
```
5. For visual studio code, you can use the `redis-cli` extension to connect to the redis server or use this software - https://redisdesktop.com/

6. Now modify the auth.controllers.ts file and add the following code:
```ts
import {Queue} from "bullmq";

/** REGISTER USER */

/** POST: http://localhost:5050/api/v2/auth/register
 * @param : {
 "username" : "codexam_123",
 "password" : "Codexam@123",
 "email": "subham@codexam.com",
 "firstName" : "Subham",
 "lastName": "Maity",
 "mobile": "1234567890",
 "address" : "india",
 "profile": ""
 }
 */
//_______________________________________________________________
        // Add the email to the queue
//_______________________________________________________________      
const emailQueue = new Queue("email-queue", {
  connection: {
    host: "",
    port: ,
    username: "",
    password: "",
  },
});

//_______________________________________________________________
// end
//_______________________________________________________________      

export const register = catchAsyncError(
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
        const { username, password, profile, email } = req.body;
      if (!password) {
        return next(new AppError("Password is required", 400));
      }

      try {
          const userExists = await userExistsByUsername(username);

        if (userExists) {
          return next(new AppError("Username already exists", 400));
        }

        const emailExists = await userExistsByEmail(email);

        if (emailExists) {
          return next(new AppError("Email already exists", 400));
        }
        const hashedPassword = await bcryptHash(password, CUSTOM_SALT_ROUNDS);

        const user = await saveUser({
          username,
          password: hashedPassword,
          profile: profile || "", 
          email,
        });

        const emailBody = {
          body: {
            name: username,
            intro: "Welcome to our community!",
          },
        };
//_______________________________________________________________
        // Add the email to the queue
//_______________________________________________________________          
        await emailQueue.add("send-welcome-email", { email, emailBody });
//_______________________________________________________________
          // end
//_______________________________________________________________   
        return res.status(201).send({
          message: "User created successfully",
          user,
        });
      } catch (error: any) {
          if (error.code === 11000) {
            return next(new AppError("Unable to register user", 500));
        } else {
          return next(new AppError("Unable to register user", 500));
        }
      }
    },
);
```



7. Now modify the mailController.ts file and add the following code:
```ts

import MailService from "./MailService";

import { Worker } from "bullmq";
//_______________________________________________________________
// Add the email to the queue
//_______________________________________________________________      
const emailQueue = new Worker(
  "email-queue",
  async (job) => {
    const { email, emailBody } = job.data;
    const jobID = job.id;
    console.log(`Processing job ${jobID}`);
    try {
      await MailService.sendMail(email, "Welcome!", emailBody);
      console.log(`Email sent for job ${jobID}`);
    } catch (error) {
      console.error(`Failed to send email for job ${jobID}: ${error}`);
    }
  },
  {
    connection: {
      host: "",
      port: ,
      username: "",
      password: "",
    },
    concurrency: 10,
    limiter: {
      max: 50,
      duration: 10 * 1000,
    },
  },
);

//_______________________________________________________________
// end
//_______________________________________________________________
class MailController {
  async sendMail(userEmail: string, subject: string, emailBody: any) {
    try {
      await MailService.sendMail(userEmail, subject, emailBody);
      return { msg: "You should receive an email from us." };
    } catch (error) {
      return { error };
    }
  }
}

export default new MailController();
```

8. Now import this in the `server.ts` file
```ts
import "./../src/utils/Stateless/mailer/Gmail-OAuth2/mailController"; // import the MailController
```

9. Now run the server and test the register endpoint. You should see the email being sent in the console.


10. POST: http://localhost:5050/api/v2/auth/register
```json
{
  "username" : "dfdfm_123",
  "password" : "Csdsdse69898@123",
  "email": "razmaityofficial@gmail.com",
  "firstName" : "Subham",
  "lastName": "Maity",
  "mobile": "1234567890",
  "address" : "india",
  "profile": ""
}
```

Terminal
```bash
[1] [16:33:09.000] INFO: Server live on: http://localhost:5050
[1] 09cd4426-af42-47ac-ab59-88b1e18ed03b - ::1 POST /api/v2/auth/register 201 286.515 ms - 236 2024-03-22 16:33:18.408
[1] Processing job 10
[1] Email sent for job 10
```


### 3. Modularity(Optional)


you can create a separate `queue.ts` file where you set up both the queue and the worker. Then, you can import and use the queue in your `register` controller and `mailController`. Here's how you can do it:

First, create a `queue.ts` file:

```typescript
// queue.ts
import { Queue, Worker } from "bullmq";
import MailService from "./MailService";

export const emailQueue = new Queue("email-queue");

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { email, emailBody } = job.data;
    const jobID = job.id;
    console.log(`Processing job ${jobID}`);
    try {
      await MailService.sendMail(email, "Welcome!", emailBody);
      console.log(`Email sent for job ${jobID}`);
    } catch (error) {
      console.error(`Failed to send email for job ${jobID}: ${error}`);
    }
  },
  {
    connection: {
      host: "",
      port: ,
      username: "",
      password: "",
    },
  },
);
```

Then, in your `register` controller, you can use the `emailQueue` like this:

```typescript
// registerController.ts
import { emailQueue } from "./queue"; // import the emailQueue

export const register = catchAsyncError(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // ...existing code...

    const emailBody = {
      body: {
        name: username,
        intro: "Welcome to our community!",
      },
    };

    // Add a job to the email queue
    await emailQueue.add("send-welcome-email", { email, emailBody });

    // ...existing code...
  },
);
```

And in your `mailController`, you can use the `emailWorker` like this:

```typescript
// mailController.ts
import { emailWorker } from "./queue"; // import the emailWorker

class MailController {
  // ...existing code...
}

export default new MailController();
```

Please replace `"./MailService"` and `"./queue"` with the actual paths to your `MailService.ts` and `queue.ts` files. If `MailService` or `emailQueue`/`emailWorker` are not the default exports, you might need to adjust the import statements accordingly.


