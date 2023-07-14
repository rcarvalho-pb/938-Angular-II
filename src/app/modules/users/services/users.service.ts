import { Injectable } from '@angular/core';
import { User } from 'src/app/modules/users/models/user.model';
import { AddressDto } from '../models/address.dto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public findAll(): User[] {
    return JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  public findByEmail(email: string): User | undefined {
    const users = this.findAll();
    return users.find((u) => u.email === email);
  }

  public findById(id: string): User | undefined {
    const users = this.findAll();
    return users.find((u) => u.id === id);
  }

  public create(user: User): boolean {
    if (this.findByEmail(user.email)) {
      return false;
    }
    user.id = crypto.randomUUID();

    const users = this.findAll();
    users.push(user);
    this.setLocalStorage(users);
    return true;
  }

  public delete(id: string): void {
    const users = this.findAll();
    const usersFiltered = users.filter((u) => u.id !== id);
    this.setLocalStorage(usersFiltered);
  }

  public update(user: User): boolean {
    const users = this.findAll();
    const idFound = users.findIndex((u) => u.id === user.id);
    if (idFound < 0) {
      return false;
    }
    users[idFound] = user;
    this.setLocalStorage(users);
    return true;
  }

  private setLocalStorage(users: User[]): void {
    localStorage.setItem('USERS', JSON.stringify(users));
  }

  public getAddressByZipCode(zipCode: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
  }
}
