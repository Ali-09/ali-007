import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { RouteDevelopmentGuard } from '@core/guards/route-development.guard';
import { MainLayoutComponent } from '@layouts/main-layout/main-layout.component';
import { LoginComponent } from '@modules/auth/login/login.component';
import { RegisterComponent } from '@modules/auth/register/register.component';
import { ElementsComponent } from '@modules/elements/elements.component';
import { HomeComponent } from '@modules/home/home.component';
import { ProfileComponent } from '@modules/profile/profile.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { animation: 'RegisterPage' }
  },
  {
    path: 'elements',
    component: ElementsComponent,
    canActivate: [RouteDevelopmentGuard],
    data: { animation: 'ElementsPage' }
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: { animation: 'MainLayout' },
    children: [
      {
        path: '',
        component: HomeComponent,
        data: { animation: 'HomePage' }
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { animation: 'ProfilePage' }
      },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];
