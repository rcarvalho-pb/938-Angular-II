import { Observable } from 'rxjs';
import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/models/user.model';
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

  public generateObservable(): Observable<string> {
    return new Observable<string>((observer) => {
      // setTimeout(() => {
      //   observer.next({
      //     name: 'Nome',
      //     age: 25,
      //   });
      // }, 2000);

      setTimeout(() => {
        observer.next('Primeiro timeout');
      }, 2000);

      setTimeout(() => {
        observer.next('Segundo timeout');
        // observer.error('Erro no observable');
        // observer.complete();
      }, 3000);

      setTimeout(() => {
        observer.next('Terceiro timeout');
      }, 5000);

      setTimeout(() => {
        observer.next('Quarto timeout');
      }, 4000);

      setTimeout(() => {
        observer.next('Quinto timeout');
      }, 6000);

      setTimeout(() => {
        observer.next('Sexto timeout');
      }, 7000);
    });
  }
}
