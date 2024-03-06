import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { asyncErrorHandler } from '../errors/async-error-handler';

@Injectable()
export class UserService {
  editUser = asyncErrorHandler(async (userId: number, dto: EditUserDto) => {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  });

  constructor(private prisma: PrismaService) {}
}
