import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { asyncErrorHandler } from '../errors/async-error-handler';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  signToken = asyncErrorHandler(async (userId: number, email: string) => {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = this.jwt.sign(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { access_token: token };
  });
  signup = asyncErrorHandler(async (dto: AuthDto) => {
    const hash = await argon.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    return this.signToken(user.id, user.email);
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
    return this.signToken(user.id, user.email);
  });

  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
}
