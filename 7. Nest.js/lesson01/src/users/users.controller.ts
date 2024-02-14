import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('users')
/*
POST /users
GET /users
PATCH /users/:id
DELETE /users/:id
*/
export class UsersController {
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findAll(@Query('role') role: 'admin' | 'user') {
    // TODO: Use 'role' for filtering in the future
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return { id };
  }

  @Post()
  create(@Body() user: NonNullable<unknown>) {
    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: NonNullable<unknown>) {
    return { id, ...user };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return { id };
  }
}
