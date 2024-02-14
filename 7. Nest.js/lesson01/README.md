### Install the required packages
```bash
npm i -g @nestjs/cli
```
then run
```bash
npm install
```
> Note: if you get red underline in the code editor, you can add the following line in the `.eslintrc.js` file
```js
'prettier/prettier': ['error', { endOfLine: 'auto' }],
```
```ts
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
```

### Let's understand basic structure of the application

- `src/main.ts` is the entry point of the application, and it uses the `NestFactory` to create a new instance of the application.
 > in simple words, it's the main file of the application, where the application starts.

- `src/app.module.ts` is the root module of the application, and it uses the `@Module` decorator to define the module.
   - In NestJS, a @Module is a class that is annotated with the @Module() decorator.
     - providers: The providers that will be instantiated by the Nest injector and that may be shared at least across this module.
     - controllers: The set of controllers defined in this module which have to be instantiated.
   
```ts
@Module({
  imports: [], // import other modules here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //export the module class here
```
- `src/app.controller.ts` is a basic controller that uses the `@Controller` decorator to define the controller.
  - In NestJS, a @Controller is a class that is annotated with the @Controller() decorator.
    - The @Controller() decorator is used to define a basic controller.
    - The @Get() decorator is used to define a basic GET request.
    - The @Post() decorator is used to define a basic POST request.
    - The @Put() decorator is used to define a basic PUT request.
    - The @Delete() decorator is used to define a basic DELETE request.
    - The @Patch() decorator is used to define a basic PATCH request.
    - The @Options() decorator is used to define a basic OPTIONS request.
    - The @Head() decorator is used to define a basic HEAD request. (This decorator is used to define a route that matches the HTTP HEAD request method.)
    - The @All() decorator is used to define a basic ALL request. (This decorator is used to define a route that matches any HTTP request method.)

```ts
import { Controller, Get, Post, Put, Delete, Patch, Options, Head, All } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  postHello(): string {
    return this.appService.postHello();
  }

  @Put()
  putHello(): string {
    return this.appService.putHello();
  }

  @Delete()
  deleteHello(): string {
    return this.appService.deleteHello();
  }

  @Patch()
  patchHello(): string {
    return this.appService.patchHello();
  }

  @Options()
  optionsHello(): string {
    return this.appService.optionsHello();
  }

  @Head()
  headHello(): string {
    return this.appService.headHello();
  }

  @All()
  allHello(): string {
    return this.appService.allHello();
  }
}

```

- `src/app.service.ts` is a basic service that uses the `@Injectable` decorator to define the service.
  - In NestJS, a @Injectable is a class that is annotated with the @Injectable() decorator.
    - The @Injectable() decorator is used to define a basic service.
    - The @Inject() decorator is used to inject a service into another service.
    - The @InjectRepository() decorator is used to inject a repository into a service.
    - The @InjectConnection() decorator is used to inject a connection into a service.
    - The @InjectModel() decorator is used to inject a model into a service.
    - The @InjectQueue() decorator is used to inject a queue into a service.
    - The @InjectPipes() decorator is used to inject pipes into a service.
    - The @InjectFilters() decorator is used to inject filters into a service.
    - The @InjectInterceptors() decorator is used to inject interceptors into a service.
    - The @InjectGuards() decorator is used to inject guards into a service.
    - The @InjectExceptionFilters() decorator is used to inject exception filters into a service.
    - The @InjectHost() decorator is used to inject the host into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.
    - The @InjectExecutionContext() decorator is used to inject the execution context into a service.

```ts
import { Injectable } from '@nestjs/common';

@Injectable()  

export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  postHello(): string {
    return 'Hello World!';
  }

  putHello(): string {
    return 'Hello World!';
  }

  deleteHello(): string {
    return 'Hello World!';
  }

  patchHello(): string {
    return 'Hello World!';
  }

  optionsHello(): string {
    return 'Hello World!';
  }

  headHello(): string {
    return 'Hello World!';
  }

  allHello(): string {
    return 'Hello World!';
  }
}

```

- `src/app.controller.spec.ts` is a basic test file that uses the `@nestjs/testing` package to test the controller.

- `src/app.service.spec.ts` is a basic test file that uses the `@nestjs/testing` package to test the service.

- `src/app.e2e-spec.ts` is a basic test file that uses the `@nestjs/testing` package to test the application end-to-end.

### Start the application
```bash
npm run start:dev
```

```bash
nest -g module <module-name>
```
```bash
nest -g controller <controller-name>
``
```bash
nest -g service <service-name>
```
```bash
nest -g pipe <pipe-name>
```
```bash
nest -g guard <guard-name>
```
```bash
nest -g filter <filter-name>
```
```bash
nest -g interceptor <interceptor-name>
```
```bash
nest -g middleware <middleware-name>
```
```bash
nest -g exception <exception-name>
```
```bash
nest -g decorator <decorator-name>
```
```bash
nest -g gateway <gateway-name>
```
```bash
nest -g resolver <resolver-name>
```

### Let's play with the application

- Open the browser and navigate to `http://localhost:3000/` to see the application running.
- `nest g module users` to create a new module
> users/user.module.ts
```ts
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [],
})
export class UsersModule {}
```
> - you will notice in the `app.module.ts` file, the new module is imported and added to the `imports` array. 

```ts
@Module({
  imports: [], // import other modules here
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} //export the module class here
```
- similarly, now create a new controller and service for the new module
```bash
nest g controller users
```
```bash
nest g service users
```

- now you can add the new controller and service to the `users.module.ts` file 
> usually it adds automatically, but if not, you can add it manually
```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})

export class UsersModule {}
```

- go to `users.controller.ts` file and add the following code
```ts

import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {
@Get()
  getUsers(): string {
    return 'Hello World!';
  }
}




}
