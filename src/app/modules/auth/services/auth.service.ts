import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/login-credentials.model';
import { LoginResponse } from '../models/login-response.model';
import { GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = GlobalConstants.API_URL;

  constructor(private http: HttpClient) {}

  public login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiURL}/login`, credentials);
  }

  public logout(): void {
    localStorage.removeItem('USER');
  }

  public isLoggedIn() {
    const token = localStorage.getItem(GlobalConstants.USER_TOKEN);
    return token ? of(true) : of(false);
  }

  public checkUserRoles(roles: string[]) {
    return new Observable<boolean>((subscriber) => {
      const user = JSON.parse(
        localStorage.getItem(GlobalConstants.USER) || 'undefined'
      );

      if (user!.roles.some((role: string) => roles.includes(role))) {
        subscriber.next(true);
      }

      subscriber.next(false);
    });
  }
}
