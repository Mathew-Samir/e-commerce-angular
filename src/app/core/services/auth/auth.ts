import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndPoint } from '../../enum/endpoints';
import { AuthResponse } from '../../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly _httpClient = inject(HttpClient);

  sendRegisterToAPI(data: AuthResponse): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(EndPoint.SIGNUP, data);
  }

  sendLoginToAPI(data: AuthResponse): Observable<AuthResponse> {
    return this._httpClient.post<AuthResponse>(EndPoint.SIGNIN, data);
  }
}
