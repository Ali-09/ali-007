import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteDevelopmentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (environment.production) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
} 