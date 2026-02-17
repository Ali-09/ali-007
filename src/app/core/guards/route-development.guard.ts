import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteDevelopmentGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    // In development mode, always allow access
    if (!environment.production) {
      return true;
    }

    // In production, redirect to home page
    this.router.navigate(['/']);
    return false;
  }
}
