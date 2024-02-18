### Let's create a restful API using NestJS(Lesson 2)
#### Let's make a module
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
- Let's create another module called `user` by using terminal
```bash
nest g module user
```
- It will create a folder called `user` and a file called `user.module.ts` inside the user folder and also import the `UserModule` to the `AppModule` automatically.

- Create another one called `bookmarks`
```bash
nest g module bookmarks
```

- Now app.module.ts looks like this
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