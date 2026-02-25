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

      alert('Дякуємо! Ваше повідомлення відправлено.');
      this.contactForm.reset();
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
