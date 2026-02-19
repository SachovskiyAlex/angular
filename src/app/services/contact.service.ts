import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../product/product.interface';
import { Observable, map } from 'rxjs';
import { Contact } from '../contacts/contact.interface';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiService = inject(ApiService);

  public getList(): Observable<Contact[]> {
    return this.apiService.get<Contact[]>('shops');
  }
}
