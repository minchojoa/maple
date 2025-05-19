import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

interface User {
  username: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  private users: User[] = [];

  register(body: any) {
    const { username, password, role } = body;
    this.users.push({ username, password, role });
    return { message: 'Registered Successfully' };
  }

  login(body: any) {
    const { username, password } = body;
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      return { message: 'Invalid User' };
    }
    const token = jwt.sign({ username, role: user.role }, 'secret');
    return { token };
  }
}