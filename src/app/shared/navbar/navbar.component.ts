import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { NavItemComponent } from '../navitem/nav-item.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NavItemComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  hoveredItem: string | null = null

  constructor(private _authService: AuthService) {}

  onLogout() {
    this._authService.logout();
  }

  getBorderColor(): string {
    switch (this.hoveredItem) {
      case 'inicio':
        return 'from-green-400 to-green-600 shadow-green-400/50'
      case 'perfil':
        return 'from-blue-400 to-blue-600 shadow-blue-400/50'
      case 'configuracion':
        return 'from-purple-400 to-purple-600 shadow-purple-400/50'
      case 'salir':
        return 'from-red-400 to-red-600 shadow-red-400/50'
      default:
        return 'from-white/20 to-white/20 shadow-white/10'
    }
  }
}
