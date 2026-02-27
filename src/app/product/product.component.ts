import { Component, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { PromoBannerComponent } from '../promo-banner/promo-banner.component';
import { combineLatest, map, startWith, BehaviorSubject } from 'rxjs';
import { Product } from './product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, PromoBannerComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private productsService = inject(ProductsService);

  public displayLimit = 8;

  private categoryFilter$ = new BehaviorSubject<string | null>(null);
  public currentCategory$ = this.categoryFilter$.asObservable();

  public products$ = combineLatest([
    this.productsService.getList(),
    this.productsService.searchQuery$.pipe(startWith('')),
    this.categoryFilter$,
    this.productsService.getWishlistIds(),
  ]).pipe(
    map(([products, searchTerm, category, wishlistIds]) => {
      return products.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        let matchesCategory = true;
        if (category === 'hit') {
          matchesCategory = !!product.isHit;
        } else if (category) {
          matchesCategory = product.title.includes(category);
        }
        const productId = String(product?.id);
        if (wishlistIds.includes(productId)) {
          product.saved = true;
        }
        return matchesSearch && matchesCategory;
      });
    }),
  );

  public setCategory(category: string | null): void {
    this.categoryFilter$.next(category);
    this.displayLimit = 8;
  }

  public showMore(): void {
    this.displayLimit += 8;
  }
  public addToWishlist(product: Product): void {
    this.productsService.addToWishlist(product.id).subscribe(() => {
      product.saved = true;
    });
  }
  public removeFromWishlist(product: Product): void {
    this.productsService.removeFromWishlist(product.id).subscribe(() => {
      product.saved = false;
    });
  }
  public toggleWishlist(product: Product): void {
    if (product.saved) {
      this.removeFromWishlist(product);
    } else {
      this.addToWishlist(product);
    }
    product.saved = !product.saved;
  }
}
//TODO add filter by price, search by name

//TODO add pagination, 8 items per page
