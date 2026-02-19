import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../product/product.interface';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiService = inject(ApiService);

  public getList(): Observable<Product[]> {
    return this.apiService.get<Product[]>('products');
  }

  public getById(id: string): Observable<Product> {
    return this.apiService.get<Product>(`products/${id}`);
  }
  public getSales(): Observable<Product[]> {
    return this.apiService
      .get<Product[]>('products/')
      .pipe(map((products) => products.filter((p) => p.priceWithDiscount)));
  }
}
