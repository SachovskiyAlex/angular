import { Component, inject, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import { Contact } from './contact.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [NgFor],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent implements OnInit {
  private contactService = inject(ContactService);

  public displayLimit = 8;

  public contacts: Contact[] = [];

  private subscriptions = new Subscription();

  public ngOnInit(): void {
    this.subscriptions.add(
      this.contactService.getList().subscribe((contacts) => {
        this.contacts = contacts;
      }),
    );
  }
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.contacts = [];
  }
  public showMore(): void {
    this.displayLimit += 8;
  }
  //TODO: implement reactive form, init,submit form
  //name > 3 chars, required > 3, email required, valid email, message > 10 chars <100, required
}
