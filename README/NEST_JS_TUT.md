
# V1.0.0 - Step by Step Guide

> **Written By**: [ﾒΛM](https://github.com/Subham-Maity)

## TOC

- [1. Basic Understanding and Setup](#1-basic-understanding-and-setup)
    - [1.1 Let's make a module](#11-lets-make-a-module)
        - [1. Create a Basic Module](#)
        - [2. Define the Module](#)
        - [3. Use the Module](#)
        - [4. Create More Modules](#)
        - [5. Create a `bookmarks` Module](#)
        - [6. Final Structure](#)
    - [1.2 Let's make a basic controller and service](#12-lets-make-a-basic-controller-and-service)
        - [1. Create the Controller and Service files](#)
        - [2. Define the Controller](#)
        - [3. Define the Service](#)
        - [4. Register the Controller and Service in the Module](#)
        - [5. Inject the Service into the Controller](#)
        - [6. Use the Service's methods in the Controller](#)
- [2. Setting Up the Auth Controller](#2-setting-up-the-auth-controller)
    - [2.1 Creating Basic Endpoints](#21-creating-basic-endpoints)
- [3. Setting up DB with docker(Prisma)](#3-setting-up-db-with-dockerprisma)
- [4. Setting up TypeORM with NestJS (Prisma)](#4-setting-up-typeorm-with-nestjs-prisma)
- [5. Understanding DTOs and Class-Validator in NestJS](#5-understanding-dtos-and-class-validator-in-nestjs)
    - [5.1 Installing Class-Validator](#51-installing-class-validator)
    - [5.2 Creating and Validating DTOs](#52-creating-and-validating-dtos)
    - [5.3 Using DTOs in Controllers](#53-using-dtos-in-controllers)
    - [5.4 Global Validation Pipe](#54-global-validation-pipe)
- [6. Implementing Signup Logic with Argon2 and Prisma](#6-implementing-signup-logic-with-argon2-and-prisma)
    - [6.1 Installing Argon2](#61-installing-argon2)
    - [6.2 Basic Signup Logic](#62-basic-signup-logic)
    - [6.3 Handling Unique Email Validation](#63-handling-unique-email-validation)
    - [6.4 Handling Errors](#64-handling-errors)
    - [6.5 Creating a Custom Exception Filter](#65-creating-a-custom-exception-filter)
- [7. Implementing Login Logic](#7-implementing-login-logic)
- [8.Automate postgres restart & prisma migrations](#8-automating-postgres-restart--prisma-migrations)
- [9.NestJs config module](#9-nestjs-config-module)
- [10. Passport & JWT module setup](#10-passport--jwt-module-setup)
    - [10.1 Basic Setup of Passport & JWT](#101-basic-setup-of-passport--jwt)
    - [10.2 Let's setup strategy](#102-lets-setup-strategy-)
- [11. NestGuard](#11-nestguard)
    - [11.1 Protecting Routes with Guards](#111-protecting-routes-with-guards)
    - [11.2 Providers](#112-providers)
    - [11.3 Return User Payload](#113-return-user-payload)
    - [11.4 JWT Guard](#114-jwt-guard)
- [12. Custom Param Decorator](#12-custom-param-decorator)
    - [12.1 Creating a GetUser Decorator](#121-creating-a-getuser-decorator)
    - [12.2 Http Decorator](#122-http-decorator)
- [13. E2E Testing](#13-e2e-testing)
- [14. Setting Up Test Database](#14-setting-up-test-database)
- [15. Dotenv for Development and Testing](#15-dotenv-for-development-and-testing-)
- [16. Database Tear Down](#16-database-tear-down)
    - [16.1 Cleaning the Database](#161-cleaning-the-database)
    - [16.2 Database Tear Down in E2E Tests](#162-database-tear-down-in-e2e-tests)
    - [16.3 Create the test](#163-create-the-test)
- [17. Auth E2E Testing with Pactum](#17-auth-e2e-testing-with-pactum)
    - [17.1 Signup test](#171-signup-test)
    - [17.2 Signin test](#172-signin-test)
    - [17.3 Error handling](#173--error-handling)
    - [17.4 Multiple Error handling](#174-multiple-error-handling)
    - [17.5 Storing the token](#175-storing-the-token)
- [18. User E2E Testing with Pactum](#18-user-e2e-testing-with-pactum)
    - [18.1 Get User with Bearer Token](#181-get-user-with-bearer-token)
    - [18.2 Edit User with Bearer Token](#182-edit-user-with-bearer-token)
        - [18.2.1 DTO for Edit User](#1821-dto-for-edit-user)
        - [18.2.2 Service for Edit User](#1822-service-for-edit-user)
        - [18.2.3 Controller for Edit User](#1823-controller-for-edit-user)
        - [18.2.4 Pactum Test for Edit User](#1824-pactum-test-for-edit-user)
> **⭐ Let's Revise the concepts and implement bookmarks [CRUD]**
- [19. Bookmarks Crud with Testing E2E](#19-bookmarks-crud-with-testing-e2e)


### 1. Basic Understanding and Setup

#### 1.1 Let's make a module

1. **Create a Basic Module**: Start by creating a new folder called `auth` inside the `src` folder. In the `auth` folder, create a new file called `auth.module.ts`.

2. **Define the Module**: In `auth.module.ts`, define the `AuthModule` class and decorate it with `@Module({})`. This decorator tells NestJS that this class is a module.

```ts
import { Module } from '@nestjs/common';

@Module({})
export class AuthModule {}
```

3. **Use the Module**: You can use this module in your application by adding it to the `imports` array of the `AppModule` or any other module where you want to use it.

Before:
```ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}
```

After:
```ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule], // Add the AuthModule to the imports array
})
export class AppModule {}
```

4. **Create More Modules**: You can create more modules using the NestJS CLI. For example, to create a `user` module, you can use the following command in the terminal:

```bash
nest g module user
```

This command will create a new folder called `user` and a new file called `user.module.ts` inside the `user` folder. It will also automatically import the `UserModule` into the `AppModule`.

5. **Create a `bookmarks` Module**: Similarly, you can create a `bookmarks` module using the following command:

```bash
nest g module bookmarks
```

6. **Final Structure**: After creating the `auth`, `user`, and `bookmark` modules, your `app.module.ts` file should look like this:

```ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
```

This structure allows you to organize your application into distinct modules, each responsible for a specific feature. This modular approach makes your application easier to understand, develop, and test.

#### 1.2 Let's make a basic controller and service


1. **Create the Controller and Service files**: In the `auth` folder, create two files: `auth.controller.ts` and `auth.service.ts`.

2. **Define the Controller**: In `auth.controller.ts`, define the `AuthController` class and decorate it with `@Controller('auth')`. This decorator tells NestJS that this class is a controller and maps any incoming requests with the path `/auth` to this controller.

```ts
import { Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {}
```

3. **Define the Service**: In `auth.service.ts`, define the `AuthService` class and decorate it with `@Injectable()`. This decorator will allow NestJS to manage this class as a provider that can be injected into other classes.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {}
```

4. **Register the Controller and Service in the Module**: In the `AuthModule`, import `AuthController` and `AuthService` and add them to the `controllers` and `providers` arrays respectively. This will allow NestJS to recognize them as part of the module.

```ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
```

5. **Inject the Service into the Controller**: In `AuthController`, inject an instance of `AuthService` through the constructor. This allows you to use the service's methods in the controller.

```ts
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
}
```

Note: The above code is a shorthand for manually creating a new instance of `AuthService` in the constructor.

6. **Use the Service's methods in the Controller**: If you have a method in `AuthService`, you can use it in `AuthController`. For example, if `AuthService` has a `test()` method:

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  test() {}
}
```

You can call this method in `AuthController` like this:

```ts
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService.test();
  }
}
```

This is a basic pattern in NestJS for separating the handling of HTTP requests (in the controller) from the business logic (in the service). The controller's job is to receive the request and send the response, while the service performs the business logic.

### 2. Setting Up the Auth Controller

#### 2.1 Creating Basic Endpoints

1. **Create Basic Endpoints**: Login and Signup are two common endpoints for authentication. Let's create these basic endpoints in the `AuthController`.

```ts
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return 'I am a signup';
  }

  @Post('login')
  login() {
    return 'I am a login';
  }
}
```

Now, if you make a POST request to `/auth/signup` or `/auth/login`, you will receive the corresponding response.

2. **Data Types and JSON**: With NestJS, you don't have to worry about the data type you send or receive. If you return an object, it will be automatically converted to JSON. If you send a JSON object, it will be automatically parsed. For example:

```ts
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return { message: 'I am a signup' }; // This will be converted to JSON
  }

  @Post('login')
  login() {
    return { message: 'I am a login' }; // This will be converted to JSON
  }
}
```

3. **Using the AuthService**: You can use the `AuthService` to handle the logic for the `signup` and `login` methods. This keeps your controller and service clean and readable.

In `auth.service.ts`:

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'I am a signup';
  }

  login() {
    return 'I am a login';
  }
}
```

In `auth.controller.ts`:

```ts
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return this.authService.signup();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
```

In this setup, the `AuthController` handles the HTTP requests and responses, while the `AuthService` contains the business logic for signup and login. This separation of concerns makes your code more organized and maintainable.

### 3. Setting up DB with docker(Prisma)

- Create a `docker-compose.yml` file in the root of your project with the following content:

```yml
version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5434:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
```
- Then run `docker compose up dev-db -d` to start the database.
- Then `docker ps` to check container id
- Then `docker logs <container_id>` to check logs of the container

```bash 
2024-02-18 19:22:56.603 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
2024-02-18 19:22:56.607 UTC [27] LOG:  database system was shut down at 2024-02-18 19:22:52 UTC
2024-02-18 19:22:56.614 UTC [1] LOG:  database system is ready to accept connections
```
### 4. Setting up TypeORM with NestJS (Prisma)

- Install the Prisma CLI globally by running the following command in your terminal:

```bash
npm install -g prisma
```

- Also install the Prisma client as a development dependency in your NestJS project:

```bash
npm install @prisma/client
```

- Now run the following command to initialize Prisma in your project:

```bash
npx prisma init
```

- It will create postgres by default, you can change it to mysql or sqlite

- Open prisma in your project now paste the following on schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now())
  email     String
  hash      String
  firstName String?
  lastName  String?
}

model Bookmarks {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now())
  title       String
  Description String
  link        String
}

```

- Now modify the .env file's `DATABASE_URL`

`default`
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
```

`change to`
```bash
DATABASE_URL="postgresql://postgres:123@localhost:5434/nest?schema=public"
```

- Now migrate the database by running the following command:

```bash
npx prisma migrate dev --name init
```

- You can use prisma studio to check the database by running the following command:

```bash
npx prisma studio
```


- In your bash run the following command:

```bash
nest g module prisma
```

- Now create a prisma service by running the following command:

```bash
nest g service prisma --no-spec
``` 

- Now modify the prisma.service.ts file to look like this:

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
        },
      },
    });
  }
}
```

- Now modify the prisma.module.ts file to look like this:

```ts

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //It will make the service available to all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService],//you need to export the service to use it in other modules
})
export class PrismaModule {}
```

### 5. Understanding DTOs and Class-Validator in NestJS

Data Transfer Objects (DTOs) are used to structure and validate the data that is sent over the network. They ensure that the data adheres to a specific format and meets certain validation criteria. In NestJS, we often use DTOs with the `class-validator` package for this purpose.

#### 5.1 Installing Class-Validator

First, install the `class-validator` and `class-transformer` packages using npm:

```bash
npm i class-validator class-transformer
```

#### 5.2 Creating and Validating DTOs

Create a `dto` folder inside the `auth` folder. Inside the `dto` folder, create a file named `auth.dto.ts`. This file will define the data structure and validation rules for the authentication data.

```ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
```

In the above code, `@IsEmail()`, `@IsNotEmpty()`, and `@IsString()` are decorators provided by `class-validator`. They specify that the email should be a valid email address, and both the email and password should be non-empty strings.

#### 5.3 Using DTOs in Controllers

You can now use this DTO in your controller. The `@Body()` decorator in combination with the DTO type will automatically validate the incoming request data and throw an error if the data is invalid.

```ts
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
```

#### 5.4 Global Validation Pipe

To enable automatic validation globally, you can add a global pipe in your main.ts file:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(3333);
}
bootstrap();
```

The `whitelist: true` option will strip any properties that don't have any decorators in the DTO.


This way, you can ensure that all incoming request data is validated according to the rules defined in your DTOs.
This helps to maintain data integrity and security in your application.


### 6. Implementing Signup Logic with Argon2 and Prisma

In this section, we will create a signup logic using NestJS, Prisma, and argon2 for password hashing.

#### 6.1 Installing Argon2

Argon2 is a password hashing algorithm that is considered to be very secure. It's a better choice than bcrypt. Install it using npm:

```bash
npm i argon2
```

#### 6.2 Basic Signup Logic

Here is the basic signup logic:
- Get the email and password from the request body
- Hash the password using an algorithm
- Create a new user in the database with the email and hashed password
- Return the user data

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password); //hashing the password
    const user = await this.prisma.user.create({ //creating the user
      data: { //data to be created
        email: dto.email, //email field from the dto
        hash, //hashed password
      },
    });
    return user;
  }
}
```

This will return the following response:

```bash
{
    "id": 4,
    "createdAt": "2024-02-28T04:38:40.804Z",
    "updatedAt": "2024-02-28T04:38:40.804Z",
    "email": "subham@gmail.com",
    "hash": "$argon2id$......",
    "firstName": null,
    "lastName": null
}
```

However, we don't want the hash to be returned to the user. We can modify the signup function to select only the necessary fields:

```ts
async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password); //hashing the password
    const user = await this.prisma.user.create({ //creating the user
      data: { //data to be created
        email: dto.email, //email field from the dto
        hash, //hashed password
      },
        select: { //selecting the fields to be returned
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
    });
    return user;
  }
```

Or, you can directly delete the hash:

```ts
async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            hash,
        },
    });
    delete user.hash; //directly delete
    return user;
}
```

#### 6.3 Handling Unique Email Validation

If we sign up multiple times with the same email, it will create multiple users with the same email. We need to check if the user already exists or not.

First, modify the schema.prisma file to make the email field unique:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int         @id @default(autoincrement())
  createdAt DateTime    @default(now())
  updatedAt DateTime    @default(now())
  email     String      @unique//making the email field unique
  hash      String
  firstName String?
  lastName  String?
  Bookmarks Bookmarks[]

  @@map("users") //mapping the table name
}

model Bookmarks {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @default(now())
  title       String
  Description String
  link        String
  userId      Int
  user        User     @relation(fields: [userId], references: [id]) //relation with the user table

  @@map("bookmarks")//mapping the table name
}
```

Now run `npx prisma migrate dev` to migrate the database and enter a name for the migration ex: `make email unique`. Now run `npx prisma studio` to check the database, and you will see the email field is unique now.

#### 6.4 Handling Errors

If you try to sign up with an email that already exists, you will get an error. This is because we are not handling the error, so let's handle the error:

```ts
 async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
```

Now you can see the error message in the postman:

```bash
{
    "statusCode": 403,
    "message": "Credentials taken",
    "error": "Forbidden"
}
```

#### 6.5 Creating a Custom Exception Filter

If you want to make it more production-ready, you can create a custom exception filter to handle the error. Make a higher-order function to handle the error:

```ts
//async-error-handler.ts

import { ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const asyncErrorHandler = (asyncFun: (...args: any[]) => Promise<any>) => {
    return async (...args: any[]) => {
        try {
            return await asyncFun(...args);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ForbiddenException('Credentials taken');
            }
            throw error;
        }
    };
};
```

Now you can use this and without try-catch block:

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { asyncErrorHandler } from '../errors/async-error-handler';

@Injectable()
export class AuthService {
  signup = asyncErrorHandler(async (dto: AuthDto) => {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    delete user.hash;
    return user;
  });

  constructor(private prisma: PrismaService) {}

  login() {
    return 'I am a login';
  }
}
```


### 7. Implementing Login Logic

In this section, we will create a login logic using NestJS, Prisma, and argon2 for password verification. The basic login logic involves the following steps:

1. Find the user by email.
2. If a user does not exist, throw an exception.
3. Compare the password.
4. If the password does not match, throw an exception.
5. Return the user.

Here is the corresponding code:

```ts
signin = asyncErrorHandler(async (dto: AuthDto) => {
    const user = await this.prisma.user.findUnique({
        where: {
            email: dto.email,
        },
    });
    if (!user) {
        throw new NotFoundException('User not found');
    }
    const match = await argon.verify(user.hash, dto.password);
    if (!match) {
        throw new UnauthorizedException('Invalid credentials');
    }
    delete user.hash;
    return user;
});
```

### 8. Automating Postgres Restart & Prisma Migrations

In this section, we will automate the process of restarting Postgres and running Prisma migrations. Follow these steps:

1. Delete the `package-lock.json` file and run `yarn` to install the dependencies.
2. Modify the script and add the following lines to the `package.json`:

```json
"prisma:dev:deploy": "prisma migrate deploy",
"db:dev:rm": "docker compose rm dev-db -s -f -v",
"db:dev:up": "docker compose up dev-db -d",
"db:dev:restart": "yarn db:dev:rm && yarn db:dev:up && node -e \"setTimeout(() => console.log('Done waiting'), 1000)\" && yarn prisma:dev:deploy",
```

The `prisma:dev:deploy` command will migrate the database to our dev database. The `docker compose rm dev-db -s -f -v` command will remove, stop, and remove the volume of the container. The `docker compose up dev-db -d` command will start the container in the background. The `db:dev:restart` command will remove the container, start the container, wait for 1 second, and then migrate the database to our dev database.

3. Run `yarn db:dev:restart` to restart the database and migrate the database to our dev database.
4. Run `npx prisma studio` to check the database.
5. Run `yarn start:dev` to start the server.

### 9. NestJs config module

#### 9.1 Basic Config Setup

- Install the config module using npm:

```bash
yarn add @nestjs/config
```
- import in app.module.ts

```ts
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,//this is same as @Global() decorator
    }),
  ],
})
```

- Now open the `prisma.service.ts` file and modify it to look like this:

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:123@localhost:5434/nest?schema=public',
                },
            },
        });
    }
}


```

To simply change
```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable() //inject the config service in the constructor
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {//inject the config service in the constructor
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),//getting the database url from the .env file
                },
            },
        });
    }
}

```

- make sure in you .env file you have the following:

```bash
DATABASE_URL="postgresql://postgres:123@localhost:5434/nest?schema=public"
```

- Now run `yarn start:dev` to start the server.

#### 9.2 Production Config Setup

- Let's try to make it production ready so add a `config` folder in the root of your project and add a `config.ts` file in it.


1. **Update your `config.ts` file**: Your `config.ts` file should return an object with the configuration for your application. Here's an example:

```typescript
// config.ts
export default () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
});
```
In this example, `config.ts` exports a function that returns an object with your database configuration. The `DATABASE_URL` is read from the environment variables.

2. **Update your `app.module.ts` file**: In your `app.module.ts` file, import `ConfigModule` from `@nestjs/config`, import your configuration from `config.ts`, and add `ConfigModule` to the `imports` array in the module metadata. Here's how you can do it:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // other modules...
  ],
  // controllers, providers, etc...
})
export class AppModule {}
```
In the above code, `load: [configuration]` tells `ConfigModule` to load the configuration from the `configuration` function.


### 10. Passport & JWT module setup

#### 10.1 Basic Setup of Passport & JWT

- Install the passport and jwt module using npm:

```bash
yarn add @nestjs/passport passport @nestjs/jwt passport-jwt

yarn add -D @types/passport-jwt
```

- Now open `auth.module.ts` and modify it to look like this:

```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],//import the jwt module
  //controllers, providers, etc...
})
export class AuthModule {}
```
> Purpose is to sing the token and verify the token

- Now open `auth.service.ts` and modify it to look like this:

```ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
//other...
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  signup = asyncErrorHandler(async (dto: AuthDto) => {
   //previous code..
  });
  signin = asyncErrorHandler(async (dto: AuthDto) => {
    //previous code..
  });

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,//dependency injection
  ) {}
}
```

> so we have injected the jwt service in the constructor, so now we can use it in the service
- We need to return the token when user signs in, and send the token when user signs up

- let's make a function which will take the payload and options and return the token

```tsx
  signToken = asyncErrorHandler(async (userId: number, email: string) => {
    const payload = {
        sub: userId,//sub is the subject of the token 
        email,//optional
    };
    const secret = this.config.get('JWT_SECRET');
    //token will expire in 15 minutes
    //payload is the data you want to store in the token
    const token = this.jwt.sign(payload, {
        expiresIn: '15m',
        secret: secret,
    });
    return { access_token: token };//return the token
});
```

- `this.config.get('JWT_SECRET');` import the config service and get the JWT_SECRET from the .env file
- and call this function in the signin function and signup function

```ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { asyncErrorHandler } from '../errors/async-error-handler';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    signToken = asyncErrorHandler(async (userId: number, email: string) => {
        const payload = {
            sub: userId,
            email,
        };
        const secret = this.config.get('JWT_SECRET');
        const token = this.jwt.sign(payload, {
            expiresIn: '15m',
            secret: secret,
        });
        return { access_token: token };
    });
    signup = asyncErrorHandler(async (dto: AuthDto) => {
        const hash = await argon.hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        });
        return this.signToken(user.id, user.email); //return the token
    });
    signin = asyncErrorHandler(async (dto: AuthDto) => {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const match = await argon.verify(user.hash, dto.password);
        if (!match) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.signToken(user.id, user.email); //return the token
    });

    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,//call the ConfigService in the constructor
    ) {}
}
```

#### 10.2 Let's setup strategy

- We need to validate the token when a user sends the token in the header, and we need to extract the token from the header and validate it
- So create a folder called `strategies` in the `auth` folder and create a file called `jwt.strategy.ts` in it and index.ts file in the `strategies` folder

- You can copy this code from [here:](#https://docs.nestjs.com/recipes/passport#implementing-passport-local)

`jwt.strategy.ts`
```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()//injectable means it can be injected in other classes as a dependency
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') { //extend means it is a subclass of the Strategy class
  constructor(//constructor means the strategy is dependent on the prisma service and the config service
    config: ConfigService,
    private prisma: PrismaService, //private means it is a private property of the class
  ) {
    super({//super means it is calling the constructor of the parent class which is the Strategy class
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //it says to extract the token from the header
      secretOrKey: config.get('JWT_SECRET'), //get the secret from the .env file
    });
  }

    validate(payload: any) { //validate the token and return the payload
        return payload;
    }
}

```

`index.ts`
```ts
export * from './jwt.strategy';
```

> It also a provider, so we need to add it to the provider array in the `auth.module.ts` file

```ts
providers: [AuthService, JwtStrategy],//add the JwtStrategy to the providers array
```

### 11. NestGuard


#### 11.1 Protecting Routes with Guards

- Now we need to protect the routes with the guards, make a user module and a user controller and a user service and a user entity
  `user module`
```ts
@Module({
    controllers: [UserController]
})
```

`user controler`


```ts
import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';



@Controller('user')

export class UserController {

  @UseGuards(AuthGuard('jwt')) //use the jwt guard

  @Get('me')

  getMe() {

    return 'This is the user me';

  }

}
```

#### 11.2 Providers
`auth.module.ts`
```ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy],//add the JwtStrategy to the providers array
})
export class AuthModule {}
```

#### 11.3 Return User Payload

`jwt.strategy.ts`
```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { sub: number; email: string }) { //return the payload
    const user = await this.prisma.user.findUnique({ //find the user by the id
      where: {
        id: payload.sub,
      },
    });
    delete user.hash; //delete the hash
    return user; //return the user
  }
}
```

#### 11.4 JWT Guard

Make a folder in auth name it guard and here use `jwt.guard.ts` and `index.ts` and then use it in the `user.controller.ts` file

`jwt.guard.ts`
```ts
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
```
`index.ts`
```ts
export * from './jwt.guard';
```

`user.controller.ts`
```ts


import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }
}


// Replace with .....

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard) //use the jwt guard
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
```

### 12. Custom Param Decorator

#### 12.1 Creating a GetUser Decorator

- the purpose is to get the user from the request object and use it in the controller

> Decorators are a powerful feature in TypeScript and JavaScript that allow you to add metadata to classes, methods, and properties. In NestJS, decorators are used to define routes, inject dependencies, and more. You can also create custom decorators to add your own functionality to your application.

First make a folder called `decorators` in the `auth` folder and then make a file called `get-user.decorator.ts` and `index.ts` in the `decorators` folder

`get-user.decorator.ts`
```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request.user;
});

```

`index.ts`
```ts
export * from './get-user.decorator';
```

`user.controller.ts`
```ts

import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard';

@Controller('user')
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }
}


// Replace with .....

import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard) //place it here so that our entire controller is protected
@Controller('user')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User) { //use the GetUser decorator
    return user;
  }
}
```

- let's return the user id instead of the entire user object
> Modify the `get-user.decorator.ts` file to look like this:

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  if (data) { //if data is provided then return the user[data]
    return request.user[data];
  }
  return request.user;
});
```
> If you provide a string, it will return the user[data] else it will return the entire user object


- Now let's say you want the email of the user, then you can use the GetUser decorator like this:

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) { //use the GetUser decorator with the email
    console.log({
      email,
    });
    return user;
  }
}
```

#### 12.2 Http Decorator

- You can pass you status code which you want to return in the response

`auth.controller.ts`

```ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(201) //use the @HttpCode decorator
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto);
    }
}

// Or you can use it like this

@HttpCode(HttpStatus.OK) //use the @HttpCode decorator

```
### 13. E2E Testing

#### 13.1 Setting up Pactum JS
> https://pactumjs.github.io/

- Install the pactum js using yarn:

```bash
yarn add -D pactum
```

- Open the `test` folder and clear the app.e2e-spec.ts file and modify it to look like this:

- Open your script in the `package.json` file and add the following:

```json
"test:e2e": "jest --watch --no-cache --config ./test/jest-e2e.json"
```
This script allows you to run your end-to-end tests using Jest. The --watch flag means Jest will watch your files for changes and rerun tests when necessary. The --no-cache flag disables caching, ensuring that your tests always run with the latest changes. The --config flag specifies the configuration file for Jest.
```ts
// Import necessary modules
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

// Declare a test suite named 'App e2e'
describe('App e2e', () => {
    // Declare a variable to hold our app instance
    let app: INestApplication;

    // Before all tests, create and initialize the app
    beforeAll(async () => {
        // Create a module for testing
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();//compile the module 

        // Create an instance of the app
        app = moduleRef.createNestApplication();

        // Apply a global validation pipe
        app.useGlobalPipes(
            new ValidationPipe({
                whitelist: true,
            }),
        );

        // Initialize the app
        await app.init();
    });

    // After all tests, close the app
    afterAll(() => {
        app.close();
    });

    // Placeholder for a test case
    it.todo('should pass');
});

```

### 14. Setting Up Test Database

-  Open the docker-compose.yml file and modify it to look like this:

> Just replicate the dev-db and change the port

```yml
version: '3.8'
services:
  dev-db:
    image: postgres:13
    ports:
      - 5434:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
  test-db:
    image: postgres:13
    ports:
      - 5435:5432 #this should be different from the dev-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
```

- Similarly modify the script for test database in the `package.json` file

> Replicate the script

```json
"prisma:dev:deploy": "prisma migrate deploy",
"db:dev:rm": "docker compose rm dev-db -s -f -v",
"db:dev:up": "docker compose up dev-db -d",
"db:dev:restart": "yarn db:dev:rm && yarn db:dev:up && node -e \"setTimeout(() => console.log('Done waiting'), 1000)\" && yarn prisma:dev:deploy",
"prisma:test:deploy": "dotenv -e .env.test -- prisma migrate deploy",
"db:test:rm": "docker compose rm test-db -s -f -v",
"db:test:up": "docker compose up test-db -d",
"db:test:restart": "yarn db:test:rm && yarn db:test:up && node -e \"setTimeout(() => console.log('Done waiting'), 1000)\" && yarn prisma:test:deploy",
```

### 15. Dotenv for Development and Testing


- Installation

```bash
yarn add -D dotenv-cli
```


- Make a file name `.env.test` and add the following:


- Now modify the `package.json` file to look like this:

```json
"prisma:test:deploy": "prisma migrate deploy",

[//]: # (change it to something like this)

"prisma:test:deploy": "dotenv -e .env.test -- prisma migrate deploy",
```

> just add `dotenv -e .env.test --` before the prisma migrate deploy
> It's mean that it will use the .env.test file for the test database and the .env file for the development database


Now modify the .env.test file just copy the`DATABASE_URL` from the .env file and change the port(which is declared in the docker-compose.yml file)

```bash
DATABASE_URL="postgresql://postgres:123@localhost:5435/nest?schema=public"
```


- Now we add this
```json
"prebuild": "rimraf dist",
```

> It will remove the dist folder before building the project


- Now change the `test:e2e` script in the `package.json` file to look like this:

```json
"test:e2e": "jest --watch --no-cache --config ./test/jest-e2e.json"

[//]: # (change it to something like this)

"pretest:e2e": "yarn db:test:restart",
"test:e2e": "dotenv -e .env.test -- jest --watch --no-cache --config ./test/jest-e2e.json"

```            
>- `pretest:e2e": "yarn db:test:restart`, will restart the test database before running the test
>- Just add `dotenv -e .env.test --` before the jest command so that it will use the .env.test file for the test database
>- It means that it will use the .env.test file for the test database and the .env file for the development database

- For checking the migration in the test database, run the following command:

```bash
yarn test:e2e  

docker ps   //two container should be running

//for check the prisma studio for the test database

npx dotenv -e .env.test prisma studio


//for check the prisma studio for the dev database

npx prisma studio 

```

### 16. Database Tear Down

#### 16.1 Cleaning the Database
>  We need to clean the database after the test, but we don't want to restart docker-compose every time, because it takes time to restart the database

- Open `prisma.service.ts` and modify it to look like this:

```ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() { //add the cleanDb function
    return this.$transaction([this.bookmark.deleteMany(), this.user.deleteMany()]);
  }
}
```

The `cleanDb` function is used to clean up the database. It's often used in testing (like before running end-to-end tests) to ensure a consistent starting state for each test run. Here's what it does:

1. **Deletes all bookmark**: `this.bookmark.deleteMany()` deletes all records from the `bookmarks` table. This is done first because the `bookmarks` table likely has a foreign key constraint on the `user` table. If we tried to delete the users first, the database would throw an error because there would still be bookmarks in the database referencing those users.

2. **Deletes all users**: `this.user.deleteMany()` deletes all records from the `user` table. This is done after deleting all bookmarks to avoid violating any foreign key constraints.

Both deletion operations are wrapped in a transaction (`this.$transaction([])`) to ensure atomicity. This means if one operation fails, the other won't be executed, leaving your database in a consistent state.

In summary, `cleanDb` is a utility function that helps maintain a clean, predictable state in your database, which is especially useful when running tests. It first deletes bookmarks and then users to respect the foreign key relationship from bookmarks to users.

#### 16.2 Database Tear Down in E2E Tests

- Open the `app.e2e-spec.ts` file and modify it to look like this:

```ts
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;//declare the prisma service
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    prisma = app.get(PrismaService); //get the prisma service from the app
    await prisma.cleanDb();//clean the database before running the test
  });

  afterAll(() => { //if you close the app the datebase will be cleaned up
    app.close();
  });

  it.todo('should pass');
});

```

#### 16.3 Create the test

- First declare this

```ts
  describe('Auth', () => {});
  describe('User', () => {});
  describe('Bookmarks', () => {});
```
- Now define this properly

```ts

describe('Auth', () => {
    describe('Signup', () => {
        it.todo('should signup');
    });
    describe('Signin', () => {
        it.todo('should signin');
    });
});
describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
});
describe('Bookmarks', () => {
    describe('Create bookmarks', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark', () => {});
    describe('Delete bookmark', () => {});
});
```
- Now run the test

```bash
yarn test:e2e
```
> `it` is a function used to define a test in Jest. `it.todo` is a special version of `it` used when you want to plan a test but aren't ready to write it yet. So, `it.todo('should signup')` means you're planning to write a test for the signup functionality, but haven't written the test code yet. When Jest runs, it will remind you that this test still needs to be written.

### 17. Auth E2E Testing with Pactum


#### 17.1 Signup test

```ts
import { AppModule } from '../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from '../src/auth/dto';
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3333);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');//base url set 
  });

  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    describe('Signup', () => {
      it('should signup', () => {//remove the todo and write the test
        const dto: AuthDto = { //create a dto object
          email: 'subham@gmail.com',
          password: 'Subham@123',
        };
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201); //send the request and expect the status 201 
        // .inspect(); //if you want to see the response
      });
    });
    describe('Signin', () => {
      it.todo('should signin');
    });
  });
  describe('User', () => {
    describe('Get me', () => {});
    describe('Edit user', () => {});
  });
  describe('Bookmarks', () => {
    describe('Create bookmarks', () => {});
    describe('Get bookmarks', () => {});
    describe('Get bookmark by id', () => {});
    describe('Edit bookmark', () => {});
    describe('Delete bookmark', () => {});
  });

  it.todo('should pass');
});
```


#### 17.2 Signin test

```ts
 describe('Auth', () => {
     const dto: AuthDto = {//delare here for reusing
        email: 'subham@gmail.com',
        password: 'Subham@123',
    };
    describe('Signup', () => {
        it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
        // .inspect();
      });
    });
    describe('Signin', () => { //same as the signup
      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200);
        // .inspect();
      });
    });
```

#### 17.3  Error handling

```ts

 describe('Auth', () => {
    const dto: AuthDto = {
      email: 'subham@gmail.com',
      password: 'Subham@123',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => { //add  the  expectStatus(400)
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
        // .inspect();
      });
    });
    describe('Signin', () => {
      it('should throw if no body provided', () => {//add  the  expectStatus(400)
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200);
        // .inspect();
      });
    });
  });
```

#### 17.4 Multiple Error handling

```ts
describe('Auth', () => {
    const dto: AuthDto = {
      email: 'subham@gmail.com',
      password: 'Subham@123',
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
        // .inspect();
      });
    });
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signin', () => {
        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(200);
        // .inspect();
      });
    });
});
```

#### 17.5 Storing the token


- We need to check use information for that we need to send bearer token in the header
>  .stores('userAt', 'access_token');
> - stores is used to store the token in the variable userAt and access_token is the key
> - if you inspect the response you will see the key access_token just copy it
```ts

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'subham@gmail.com',
      password: 'Subham@123',
    };

    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201);
        // .inspect();
      });
    });
    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');//use here
        // .inspect();
      });
    });
  });
```


### 18. User E2E Testing with Pactum

#### 18.1 Get User with Bearer Token

```ts
describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/user/me')
          .withHeaders({//send the token in the header 
            Authorization: 'Bearer $S{userAt}',//herer userAt is the variable name and access_token is the key  
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {});
  });
```


#### 18.2 Edit User with Bearer Token

##### 18.2.1 DTO for Edit User
- First write the controller and service for the edit user

> - nest g service user --no-spec

`user dto edit`

> dto use for the validation of the data
```ts
import { IsEmail, IsOptional, IsString } from 'class-validator';
export class EditUserDto {
  @IsEmail() //the email should be a valid email
  @IsOptional()//optional
  email?: string;

  @IsString()//the first name should be a string
  @IsOptional()//optional
  firstName?: string;

  @IsString()//the last name should be a string
  @IsOptional()//optional   
  lastName?: string;
}

```

##### 18.2.2 Service for Edit User
`user service`

> service use for the business logic

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {} //inject the prisma service

    async editUser(userId: number, dto: EditUserDto) { //It will take the user id and the dto 
        
        //update the user by the user id 
        const user = await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...dto,
            },
        });

        delete user.hash;//delete the hash

        return user;
    }
}
```
##### 18.2.3 Controller for Edit User
`user.controller.ts`

```ts
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}// UserService from the service
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }

    @Patch() //use the patch method 
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) { // use the GetUser decorator to get the user id and the dto  
        return this.userService.editUser(userId, dto); //call the editUser function from the service 
    }
}

```

##### 18.2.4 Pactum Test for Edit User

- Now write the test for the edit user

```ts
describe('Edit user', () => {
    it('should edit user', () => {
        const dto: EditUserDto = {
            firstName: 'Subham',
            email: 'subham1@gmail.com',
            lastName: 'Maity'
        };
        return pactum
            .spec()
            .patch('/users')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.firstName)
            .expectBodyContains(dto.email);;
    });
});
```

### 19. Bookmarks Crud with Testing E2E

> ✅ **Step 0:** Schema Define

- Open prisma folder and modify the schema.prisma file to look like this:

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  email String @unique
  hash  String

  firstName String?
  lastName  String?

  bookmarks Bookmark[]

  @@map("users")
}
//Bookmark model
model Bookmark {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  title       String
  description String?
  link        String

  userId Int
  user   User @relation(fields: [userId], references: [id])

  @@map("bookmarks")
}

```


> ✅ **Step 1:** Installation

First, we need to generate the service and controller for bookmarks. Run the following commands:

```sh
nest g service bookmark --no-spec
nest g controller bookmark --no-spec
```

> ✅ **Step 2:** Controller Structure

Next, we will set up the structure of our controller. Here are the steps:

1. Declare the `UseGuards` for authentication.
2. The constructor should be called inside `BookmarkController` with `private bookmarksService: BookmarksService`.
3. `BookmarksService` should have `private prisma: PrismaService` inside it.
4. Declare all the routes in the `bookmark.controller.ts` file.

Here's an example of what your `bookmark.controller.ts` file might look like:

```ts
import { Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { BookmarksService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}
    
    @Get()
    getBookmarks() {}
    
    @Get()
    getBookmarkById() {}
    
    @Post()
    createBookmark() {}
    
    @Patch()
    editBookmarkById() {}
    
    @Delete()
    deleteBookmarkById() {}
}
```


> ✅ **Step 3:** - Decorators for the Bookmarks

- use `Param decorator` for those routes which need the id of the bookmark

_info: we already created a get-user.decorator.ts file in the auth folder, so we can use it here_

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
  const request: Express.Request = ctx.switchToHttp().getRequest();
  if (data) {
    return request.user[data];
  }
  return request.user;
});
```

```ts
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}
    @Get()
    getBookmarks(@GetUser('id') userId: number) { //a.
        console.log(userId);
    }
    @Get(':id') 
    getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {//b.
        console.log(userId, bookmarkId);
    }
    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {//c.
        console.log(userId, dto);
    }
    @Patch(':id')
    editBookmarkById(//d.
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto,
    ) {
        console.log(userId, bookmarkId, dto);
    }
    @HttpCode(HttpStatus.NO_CONTENT)//e.
    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        console.log(userId, bookmarkId);
    }
}
```
- **a.** `getBookmarks(@GetUser('id') userId: number)`: This route fetches all bookmark for a user. The `@GetUser('id')` decorator retrieves the user's ID.



- **b.** `getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number)`: This route fetches a specific bookmark by its ID for a user. The `@GetUser('id')` decorator retrieves the user's ID, and `@Param('id', ParseIntPipe)` retrieves and parses the bookmark ID from the URL.



- **c.** `createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto)`: This route creates a new bookmark for a user. The `@GetUser('id')` decorator retrieves the user's ID, and `@Body()` retrieves the request body data with validation applied.



- **d.** `editBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number, @Body() dto: EditBookmarkDto)`: This route edits a specific bookmark by its ID for a user. The `@GetUser('id')` decorator retrieves the user's ID, `@Param('id', ParseIntPipe)` retrieves and parses the bookmark ID from the URL, and `@Body()` retrieves the request body data with validation applied.



- **e.** `deleteBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number)`: This route deletes a specific bookmark by its ID for a user. The `@GetUser('id')` decorator retrieves the user's ID, and `@Param('id', ParseIntPipe)` retrieves and parses the bookmark ID from the URL. The `@HttpCode(HttpStatus.NO_CONTENT)` decorator sets the HTTP status code to 204 (No Content) when the operation is successful.

> ✅ **Step 4:** - DTO for Bookmarks

- Make a folder named `dto` inside the `bookmarks` folder and then make a file called `create-bookmark.dto.ts`,`edit-bookmark.dto.ts` and `index.ts` inside the `dto` folder

`create-bookmark.dto.ts`
```ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
```

`edit-bookmark.dto.ts`
```ts
import { IsOptional, IsString } from 'class-validator';

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
```

`index.ts`
```ts
export * from './create-bookmark.dto';
export * from './edit-bookmark.dto';
```

> ✅ **Step 5:** - Service Structure for Bookmarks

- Construct the `BookmarksService` with `private prisma: PrismaService` inside it.

```ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) {}

    getBookmarks(userId: number) {
        console.log(userId);
    }

    getBookmarkById(userId: number, bookmarkId: number) {
        console.log(userId, bookmarkId);
    }

    createBookmark(userId: number, dto: CreateBookmarkDto) {
        console.log(userId, dto);
    }

    editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        console.log(userId, bookmarkId, dto);
    }

    deleteBookmarkById(userId: number, bookmarkId: number) {
        console.log(userId, bookmarkId);
    }
}


```
> ✅ **Step 6:** - Bookmarks Service in the Controller


- Inject the `BookmarksService` inside the `BookmarkController` and call the service methods inside the routes.

```ts
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guard';

import { GetUser } from '../auth/decorator';

import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { BookmarkService } from './bookmark.service';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarksService: BookmarkService) {}

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarksService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarksService.getBookmarkById(userId, bookmarkId);
    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
        return this.bookmarksService.createBookmark(userId, dto);
    }

    @Patch(':id')
    editBookmarkById(
        @GetUser('id') userId: number,

        @Param('id', ParseIntPipe) bookmarkId: number,

        @Body() dto: EditBookmarkDto,
    ) {
        return this.bookmarksService.editBookmarkById(userId, bookmarkId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookmarksService.deleteBookmarkById(userId, bookmarkId);
    }
}

```


> ✅ **Step 7:** - E2E Testing With Business Logic (Service)


- For testing `yarn test:e2e`


1. ⇨ **Get Empty Bookmarks**

`app.e2e-spec.ts`
```ts

describe('Get empty bookmarks', () => {
    it('should get empty bookmarks', () => {
        return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({ Authorization: 'Bearer $S{userAt}' })
            .expectStatus(200)
            .expectBody([]); //body should be an array and length should be 0
    });
});
```

`bookmark.service.ts`
```ts

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }
}
```

2. ⇨ **Create Bookmarks**

`app.e2e-spec.ts`
```ts
describe('Create bookmarks', () => {
    const dto: CreateBookmarkDto = {
        title: 'NestJS',
        link: 'https://nestjs.com/',
    };
    it('should create bookmark', () => {
        return pactum
            .spec()
            .post('/bookmarks')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(201)
            .stores('bookmarkId', 'id')//store the bookmark id in the variable bookmarkId 
            .expectBodyContains(dto.title)
            .expectBodyContains(dto.link)
            
    });
});
```

`bookmark.service.ts`
```ts
@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

    createBookmark(userId: number, dto: CreateBookmarkDto) {
        return this.prisma.bookmark.create({
            data: {
                userId,
                ...dto,
            },
        });
    }
}
```
3. ⇨ **Get Bookmarks**

> First it expects nothing in the get request, and then it creates a bookmark, and then it expects the length of the array to be 1

`app.e2e-spec.ts`
```ts
   describe('Get bookmarks', () => {
    it('should get bookmarks', () => {
        return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .expectJsonLength(1);//body should be an array and length should be 1
    });
});
```


4. ⇨ **Get Bookmark by ID**

> `.stores('bookmarkId', 'id')` when we create the bookmark we store the id in the variable bookmarkId, and then we use it here
`app.e2e-spec.ts`
```ts

describe('Get bookmark by id', () => {
    it('should get bookmark by id', () => {
        return pactum
            .spec()
            .get('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .expectBodyContains('$S{bookmarkId}');//expect the body to contain the bookmark id 
    });
});
```

`bookmark.service.ts`
```ts
@Injectable()
export class BookmarksService {
    constructor(private prisma: PrismaService) {}

    getBookmarkById(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.findFirst({
            where: {
                id: bookmarkId,
                userId,
            },
        });
    }
}
```

5. ⇨ **Edit Bookmark by ID**

`app.e2e-spec.ts`
```ts
 describe('Edit bookmark by id', () => {
    const dto: EditBookmarkDto = {
        title: 'Kubernetes Course - Full Beginners Tutorial (Containerize Your Apps!)',
        description:
            'Learn how to use Kubernetes in this complete course. Kubernetes makes it possible to containerize applications and simplifies app deployment to production.',
    };
    it('should edit bookmark', () => {
        return pactum
            .spec()
            .patch('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .withBody(dto)
            .expectStatus(200)
            .expectBodyContains(dto.title)
            .expectBodyContains(dto.description);
    });
});
```

`bookmark.service.ts`
```ts
async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    // get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
        where: {
            id: bookmarkId,
        },
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
        throw new ForbiddenException('Access to resources denied');

    return this.prisma.bookmark.update({
        where: {
            id: bookmarkId,
        },
        data: {
            ...dto,
        },
    });
}
```


6. ⇨ **Delete Bookmark by ID**

> First it expects the length of the array to be 1, then it deletes the bookmark, and then it expects the length of the array to be 0
`app.e2e-spec.ts`

```ts
describe('Delete bookmark by id', () => {
    it('should delete bookmark', () => {
        return pactum
            .spec()
            .delete('/bookmarks/{id}')
            .withPathParams('id', '$S{bookmarkId}')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(204);
    });

    it('should get empty bookmarks', () => {
        return pactum
            .spec()
            .get('/bookmarks')
            .withHeaders({
                Authorization: 'Bearer $S{userAt}',
            })
            .expectStatus(200)
            .expectJsonLength(0);
    });
});
```

`bookmark.service.ts`
```ts
async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
        where: {
            id: bookmarkId,
        },
    });

    // check if user owns the bookmark
    if (!bookmark || bookmark.userId !== userId)
        throw new ForbiddenException('Access to resources denied');

    await this.prisma.bookmark.delete({
        where: {
            id: bookmarkId,
        },
    });
}
```


It will give you this output:
```bash
PS > yarn test:e2e  
yarn run v1.22.19
$ docker compose rm test-db -s -f -v
[+] Stopping 1/1
 ✔ Container lesson02-test-db-1  Stopped                                                                                                                                                                                                                       0.3s 
Going to remove lesson02-test-db-1
[+] Removing 1/0
 ✔ Container lesson02-test-db-1  Removed                                                                                                                                                                                                                       0.0s 
$ docker compose up test-db -d
[+] Running 1/1
 ✔ Container lesson02-test-db-1  Started                                                                                                                                                                                                                       0.0s 
Done waiting
$ dotenv -e .env.test -- prisma migrate deploy
Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "nest", schema "public" at "localhost:5435"

1 migration found in prisma/migrations

Applying migration `20240307030332_init`

The following migration(s) have been applied:

migrations/
  └─ 20240307030332_init/
    └─ migration.sql
      
All migrations have been successfully applied.
$ dotenv -e .env.test -- jest --watch --no-cache --config ./test/jest-e2e.json
 PASS  test/app.e2e-spec.ts (5.369 s)
  App e2e
    Auth
      Signup
        √ should throw if email empty (56 ms)
        √ should throw if password empty (5 ms)
        √ should throw if no body provided (4 ms)
        √ should signup (80 ms)
      Signin
        √ should throw if email empty (3 ms)
        √ should throw if password empty (2 ms)
        √ should throw if no body provided (2 ms)
        √ should signin (66 ms)
    User
      Get me
        √ should get current user (8 ms)
      Edit user
        √ should edit user (8 ms)
    Bookmarks
      Get empty bookmarks
        √ should get bookmarks (6 ms)
      Create bookmark
        √ should create bookmark (8 ms)
      Get bookmarks
        √ should get bookmarks (5 ms)
      Get bookmark by id
        √ should get bookmark by id (5 ms)
      Edit bookmark by id
        √ should edit bookmark (10 ms)
      Delete bookmark by id
        √ should delete bookmark (9 ms)
        √ should get empty bookmarks (5 ms)

Test Suites: 1 passed, 1 total
Tests:       17 passed, 17 total
Snapshots:   0 total
Time:        5.8 s
Ran all test suites related to changed files.

```