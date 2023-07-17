import { Observable } from 'rxjs';
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
}
