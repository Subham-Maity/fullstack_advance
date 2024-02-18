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
