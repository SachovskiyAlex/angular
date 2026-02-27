import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../product/product.interface';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private apiService = inject(ApiService);

  private searchSubject = new BehaviorSubject<string>('');
  public searchQuery$ = this.searchSubject.asObservable();

  public updateSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }

  public getList(): Observable<Product[]> {
    return this.apiService.get<Product[]>('products');
  }

  public getById(id: number): Observable<Product> {
    return this.apiService.get<Product>(`products/${id}`);
  }

  public getSales(): Observable<Product[]> {
    return this.apiService
      .get<Product[]>('products/')
      .pipe(map((products) => products.filter((p) => p.priceWithDiscount)));
  }

  public deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(`products/${id}`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.apiService.post<Product>('products', product);
  }
  public addToWishlist(productId: number): Observable<void> {
    return this.apiService.post('wishlist', { id: productId });
  }
  public removeFromWishlist(productId: number): Observable<void> {
    return this.apiService.delete(`wishlist/${productId}`);
  }
  public getWishlistIds(): Observable<string[]> {
    return this.apiService
      .get<{ id: number }[]>('wishlist')
      .pipe(map((items) => items.map((item) => String(item.id))));
  }
}
