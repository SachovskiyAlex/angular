import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import { Contact } from './contact.interface';
import { NgFor, NgIf } from '@angular/common';
import { SlicePipe } from '@angular/common';
// Додаємо імпорти для форм
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: true,
  // Додаємо ReactiveFormsModule та NgIf в imports
  imports: [NgFor, NgIf, ReactiveFormsModule, SlicePipe],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit, OnDestroy {
  private contactService = inject(ContactService);
  private fb = inject(FormBuilder); // Ін'єкція FormBuilder

  public displayLimit = 8;
  public contacts: Contact[] = [];
  public contactForm!: FormGroup; // Об'єкт форми
  private subscriptions = new Subscription();

  public ngOnInit(): void {
    // Ініціалізація форми з валідацією
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
    if (this.contactForm.valid) {
      console.log('Дані форми:', this.contactForm.value);
      // Тут можна викликати метод сервісу для відправки повідомлення
      alert('Дякуємо! Ваше повідомлення відправлено.');
      this.contactForm.reset(); // Очищення форми після успішної відправки
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.contacts = [];
  }

  public showMore(): void {
    this.displayLimit += 8;
  }
}
