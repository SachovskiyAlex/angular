import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../product/product.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiService = inject(ApiService);

  public getList(): Observable<Product[]> {
    return this.apiService.get<Product[]>('products');
  }
}
