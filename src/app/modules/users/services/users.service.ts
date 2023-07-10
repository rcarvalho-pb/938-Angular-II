import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  public findAll(): User[] {
    return JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  public findByEmail(email: string): User | undefined {
    const users = this.findAll();
    return users.find((u) => u.email === email);
  }
}
