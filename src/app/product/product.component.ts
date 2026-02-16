import { Component, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';
import { PromoBannerComponent } from '../promo-banner/promo-banner.component';

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

  public products$ = this.productsService.getList();

  public showMore(): void {
    this.displayLimit += 8;
  }
}
