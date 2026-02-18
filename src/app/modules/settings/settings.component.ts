import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastPosition } from '@core/models/toast.model';
import { UserProfile } from '@core/models/user-profile.model';
import { AuthService } from '@core/services/auth.service';
import { ProfileService } from '@core/services/profile.service';
import { ToastService } from '@core/services/toast.service';
import { ButtonComponent } from '@shared/button/button.component';
import { InputComponent } from '@shared/input/input.component';
import { SelectComponent } from '@shared/select/select.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectComponent, ButtonComponent, InputComponent],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  profile: UserProfile | null = null;

  private readonly incomeFrequencyLabelById: Record<number, string> = {
    1: 'Mensual',
    2: 'Quincenal',
    3: 'Semanal',
    4: 'Anual',
  };

  private readonly incomeFrequencyIdByLabel: Record<string, number> = {
    Mensual: 1,
    Quincenal: 2,
    Semanal: 3,
    Anual: 4,
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toast: ToastService,
    private profileService: ProfileService,
  ) {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      salary: [0, [Validators.required, Validators.min(0)]],
      currency_id: [1, [Validators.required]],
      income_frequency: ['Mensual', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (user) {
      const fullName = user.name ?? '';
      const [firstName, ...rest] = fullName.split(' ');
      const lastName = rest.join(' ');

      this.form.patchValue({
        first_name: firstName,
        last_name: lastName,
        email: user.email,
      });
    }

    this.profileService.getProfile().subscribe({
      next: profile => {
        this.profile = profile;
        this.form.patchValue({
          first_name: profile.first_name,
          last_name: profile.last_name,
          salary: Number(profile.salary),
          currency_id: profile.currency_id,
          income_frequency: this.incomeFrequencyLabelById[profile.income_frequency_id] || 'Mensual',
        });
      },
      error: () => {
        this.toast.error('No se pudo cargar el perfil de usuario', ToastPosition.TopRight);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.value;
    const incomeFrequencyId = this.incomeFrequencyIdByLabel[value.income_frequency] || 1;

    const baseProfile: UserProfile = this.profile ?? {
      first_name: value.first_name ?? '',
      last_name: value.last_name ?? '',
      phone: '',
      salary: '0.00',
      currency_id: value.currency_id,
      income_frequency_id: incomeFrequencyId,
    };

    const payload: UserProfile = {
      ...baseProfile,
      first_name: value.first_name ?? baseProfile.first_name,
      last_name: value.last_name ?? baseProfile.last_name,
      salary: Number(value.salary ?? 0).toFixed(2),
      currency_id: value.currency_id,
      income_frequency_id: incomeFrequencyId,
    };

    this.profileService.updateProfile(payload).subscribe({
      next: updated => {
        this.profile = updated;
        this.auth.updateLocalUser({
          name: `${value.first_name} ${value.last_name}`.trim(),
          email: value.email,
          salary: Number(updated.salary),
          currency_id: updated.currency_id,
          income_frequency: this.incomeFrequencyLabelById[updated.income_frequency_id],
        });
        this.form.markAsPristine();
      },
    });
  }
}
