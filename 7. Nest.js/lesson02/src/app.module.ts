import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';

@Module({
  imports: [AuthModule, UserModule, BookmarksModule],
})
export class AppModule {}
