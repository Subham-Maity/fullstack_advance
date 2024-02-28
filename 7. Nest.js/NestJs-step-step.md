## Let's create a restful API using NestJS(Lesson 2)

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

6. **Final Structure**: After creating the `auth`, `user`, and `bookmarks` modules, your `app.module.ts` file should look like this:

```ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [AuthModule, UserModule, BookmarksModule],
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
  test-db:
    image: postgres:13
    ports:
      - 5435:5432
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

### 6. Understanding DTOs and Class-Validator in NestJS

Data Transfer Objects (DTOs) are used to structure and validate the data that is sent over the network. They ensure that the data adheres to a specific format and meets certain validation criteria. In NestJS, we often use DTOs with the `class-validator` package for this purpose.

#### 6.1 Installing Class-Validator

First, install the `class-validator` and `class-transformer` packages using npm:

```bash
npm i class-validator class-transformer
```

#### 6.2 Creating and Validating DTOs

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

#### 6.3 Using DTOs in Controllers

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

#### 6.4 Global Validation Pipe

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


### 7. Implementing Signup Logic with Argon2 and Prisma

In this section, we will create a signup logic using NestJS, Prisma, and argon2 for password hashing.

#### 7.1 Installing Argon2

Argon2 is a password hashing algorithm that is considered to be very secure. It's a better choice than bcrypt. Install it using npm:

```bash
npm i argon2
```

#### 7.2 Basic Signup Logic

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

#### 7.3 Handling Unique Email Validation

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

#### 7.4 Handling Errors

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

#### 7.5 Creating a Custom Exception Filter

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

### 8. Implementing Login Logic
Here is the basic login logic:
- Find the user by email
- If a user does not exist, throw exception
- Compare the password
- If password does not match throw exception
- Return the user

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
