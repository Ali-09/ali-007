import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, LoginRequest, RegisterRequest } from '@core/models/auth.model';
import { User } from '@core/models/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = '/api';

  private readonly currentUserSignal = signal<User | null>(null);
  private readonly tokenSignal = signal<string | null>(null);

  public readonly currentUser = computed(() => this.currentUserSignal());
  public readonly token = computed(() => this.tokenSignal());

  constructor(private http: HttpClient, private router: Router) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      this.currentUserSignal.set(JSON.parse(storedUser));
      this.tokenSignal.set(storedToken);
    }
  }

  private setAuthState(user: User, token: string): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.currentUserSignal.set(user);
    this.tokenSignal.set(token);
  }

  clearAuthState(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSignal.set(null);
    this.tokenSignal.set(null);
    this.router.navigate(['login']);
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSignal() && !!this.tokenSignal();
  }

  get hasValidToken(): boolean {
    const token = this.tokenSignal();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      return Date.now() < expirationTime;
    } catch {
      return false;
    }
  }

  register(user: RegisterRequest): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, user).pipe(
      map(response => {
        this.setAuthState(response.user, response.access_token);
        return response.user;
      }),
      catchError(error => {
        return throwError(() => error);
      }),
    );
  }

  login(email: string, password: string): Observable<User> {
    const loginData: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, loginData).pipe(
      map(response => {
        this.setAuthState(response.user, response.access_token);
        return response.user;
      }),
      catchError(error => {
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout/`, {}).subscribe(() => {
      this.clearAuthState();
    })
  }

  updateLocalUser(partial: Partial<User>): void {
    const current = this.currentUserSignal();
    if (!current) return;

    const updated: User = { ...current, ...partial };
    const token = this.tokenSignal();

    if (token) {
      this.setAuthState(updated, token);
    } else {
      this.currentUserSignal.set(updated);
      localStorage.setItem('currentUser', JSON.stringify(updated));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
