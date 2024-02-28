import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  constructor(private prisma: PrismaService) {}
}
