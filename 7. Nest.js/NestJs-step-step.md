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

### 3. Setting up DB with docker

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
