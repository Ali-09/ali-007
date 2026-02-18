import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '@core/models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile/`);
  }

  updateProfile(payload: UserProfile): Observable<UserProfile> {
    return this.http.patch<UserProfile>(`${this.apiUrl}/profile/`, payload);
  }
}

