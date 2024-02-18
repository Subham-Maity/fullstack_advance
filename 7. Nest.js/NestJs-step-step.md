### Let's create a restful API using NestJS(Lesson 2)
- You can follow my commit after [This](https://github.com/Subham-Maity/fullstack_advance/tree/854c3e32d596f0d92b48b5e1b478ed51a89d3afb)
1. Let's create a basic module
- create a folder called auth inside src folder
- create a file called `auth.module.ts` inside the auth folder
> Basic module structure
```ts
import { Module } from '@nestjs/common';

@Module({})
export class AppModule {}
```
- we can use this module in our application by adding it to the import array of the `AppModule` or any other module that we want to use it in.

-`before`
```ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
})
export class AppModule {}

```
`after`
```ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [AuthModule],//add the AuthModule to the imports array
})
export class AppModule {}
```