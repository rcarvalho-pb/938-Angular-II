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

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/users');
  }

  public findById(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:5000/users/${id}`);
  }

  public create(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:5000/users', user);
  }

  public update(user: User): Observable<any> {
    return this.http.put<User>(`http://localhost:5000/users/${user.id}`, user);
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:5000/users/${id}`);
  }

  public getAddressByZipCode(zipCode: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(
      `https://viacep.com.br/ws/${zipCode}/json/`
    );
  }
}
