import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  register(name: string, email: string, _password: string): Observable<User> {
    // TODO: Replace with actual API call
    return new Observable<User>(observer => {
      // Simulate API call
      setTimeout(() => {
        const user: User = {
          id: Math.floor(Math.random() * 1000),
          email: email,
          name: name,
        };
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }

  login(email: string, _password: string): Observable<User> {
    // TODO: Replace with actual API call
    return new Observable<User>(observer => {
      // Simulate API call
      setTimeout(() => {
        const user: User = {
          id: 1,
          email: email,
          name: 'Test User',
        };
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        observer.next(user);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
