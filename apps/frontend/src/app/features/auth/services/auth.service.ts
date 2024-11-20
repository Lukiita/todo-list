import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { STORAGE_KEYS } from '../../../core/utils/storage-keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/users/login', { email, password })
      .pipe(
        tap(({ token }) => localStorage.setItem(STORAGE_KEYS.TOKEN, token)),
      );
  }

  public logout(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }
}
