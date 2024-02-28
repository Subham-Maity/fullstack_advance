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
