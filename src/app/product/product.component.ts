import { Component, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { PromoBannerComponent } from '../promo-banner/promo-banner.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    AsyncPipe,
    RouterLink,
    PromoBannerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private productsService = inject(ProductsService);

  public displayLimit = 8;

  public minPriceControl = new FormControl<number | null>(null);
  public maxPriceControl = new FormControl<number | null>(null);

  public products$ = combineLatest([
    this.productsService.getList(),
    this.productsService.searchQuery$.pipe(startWith('')),
    this.minPriceControl.valueChanges.pipe(startWith(null)),
    this.maxPriceControl.valueChanges.pipe(startWith(null)),
  ]).pipe(
    map(([products, searchTerm, minPrice, maxPrice]) => {
      return products.filter((product) => {
        const matchesName = product.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const price = product.priceWithDiscount || product.price;

        const matchesMin = minPrice !== null ? price >= minPrice : true;
        const matchesMax = maxPrice !== null ? price <= maxPrice : true;

        return matchesName && matchesMin && matchesMax;
      });
    }),
  );
  public showMore(): void {
    this.displayLimit += 8;
  }
}
