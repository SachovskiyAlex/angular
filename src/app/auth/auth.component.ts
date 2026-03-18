import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User, UserLogin } from './users.interface';
import { switchMap, of } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private userService = inject(UsersService);
  public isLoginMode = true;
  public authForm: FormGroup;
  public user: User | null = null;

  constructor(private fb: FormBuilder) {
    this.authForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: [''],
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    const nameControl = this.authForm.get('name');

    if (!this.isLoginMode) {
      nameControl?.setValidators([Validators.required]);
    } else {
      nameControl?.clearValidators();
    }
    nameControl?.updateValueAndValidity();
  }

  public onSubmit(): void {
    if (!this.authForm.valid) {
      return;
    }
    console.log('Дані форми:', this.authForm.value);
    const { email } = this.authForm.value;
    this.userService
      .getUserByEmail(email)
      .pipe(
        switchMap((user) => {
          if (user) {
            alert('Такий користувач існує. Виконуємо вхід.');
            return of(null);
          } else {
            return this.userService.saveUser(this.authForm.value);
          }
        }),
      )
      .subscribe(
        (user) => {
          this.user = user;
          this.authForm.reset();
        },
        (error) => {
          console.error('', error);
          alert('');
        },
      );
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
