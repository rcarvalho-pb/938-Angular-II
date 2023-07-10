import { UsersService } from '../../users/services/users.service';
import { User } from './../../../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private usersService: UsersService) {}

  public login(credentials: Partial<User>): User | string {
    const user = this.usersService.findByEmail(credentials.email!);

    if (!user) {
      return 'Email não encontrado!';
    }

    if (user?.password !== credentials.password) {
      return 'Senha incorreta!';
    }

    localStorage.setItem('USER', JSON.stringify(user));
    return user;
  }

  public logout(): void {
    localStorage.removeItem('USER');
  }
}
