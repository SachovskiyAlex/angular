import { Component, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest, map, startWith, BehaviorSubject } from 'rxjs';

import { ProductsService } from '../services/products.service';
import { PromoBannerComponent } from '../promo-banner/promo-banner.component';
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

  private currentPage$ = new BehaviorSubject<number>(1);
  public currentPageValue = 1;

  public itemsPerPage = 8;
  public totalItems = 0;

  public changePage(page: number): void {
    this.currentPageValue = page;
    this.currentPage$.next(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  private categoryFilter$ = new BehaviorSubject<string | null>(null);

  public setCategory(category: string | null): void {
    this.categoryFilter$.next(category);

    this.currentPageValue = 1;
    this.currentPage$.next(1);
  }

  public products$ = combineLatest([
    this.productsService.getList(),
    this.productsService.searchQuery$.pipe(startWith('')),
    this.categoryFilter$,
    this.productsService.getWishlistIds(),
    this.currentPage$,
  ]).pipe(
    map(([products, searchTerm, category, wishlistIds, currentPage]) => {
      const filtered = products.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

        const matchesCategory =
          category === 'hit'
            ? !!product.isHit
            : category
              ? product.title.includes(category)
              : true;

        product.saved = wishlistIds.includes(String(product.id));

        return matchesSearch && matchesCategory;
      });

      this.totalItems = filtered.length;

      const start = (currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;

      return filtered.slice(start, end);
    }),
  );

  public toggleWishlist(product: Product): void {
    const action$ = product.saved
      ? this.productsService.removeFromWishlist(product.id)
      : this.productsService.addToWishlist(product.id);

    action$.subscribe(() => {
      product.saved = !product.saved;
    });
  }
}
