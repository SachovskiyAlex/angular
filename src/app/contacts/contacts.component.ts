import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import { Contact } from './contact.interface';
import { NgFor, NgIf } from '@angular/common';
import { SlicePipe } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,

  imports: [NgFor, NgIf, ReactiveFormsModule, SlicePipe],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit, OnDestroy {
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder);

  public displayLimit = 8;
  public contacts: Contact[] = [];
  public contactForm!: FormGroup;
  private subscriptions = new Subscription();

  public ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(100),
        ],
      ],
    });

    this.subscriptions.add(
      this.contactService.getList().subscribe((contacts) => {
        this.contacts = contacts;
      }),
    );
  }

  public onSubmit(): void {
    if (!this.contactForm.valid) {
      return;
    }
    console.log('Дані форми:', this.contactForm.value);
    this.contactService.saveContact(this.contactForm.value).subscribe(
      () => {
        alert('Дякуємо! Ваше повідомлення відправлено.');
        this.contactForm.reset();
      },
      (error) => {
        console.error('', error);
        alert('');
      },
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.contacts = [];
  }

  public showMore(): void {
    this.displayLimit += 8;
  }
  public getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control?.hasError('required')) {
      return "Це поле обов'язкове";
    }
    if (control?.hasError('minlength')) {
      return `Мінімальна довжина ${control.errors ? control.errors['minlength'].requiredLength : 0} символів`;
    }
    if (control?.hasError('maxlength')) {
      return `Максимальна довжина ${control.errors ? control.errors['maxlength'].requiredLength : 0} символів`;
    }
    if (control?.hasError('email')) {
      return 'Введіть коректний Email';
    }
    return '';
  }
  public hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
