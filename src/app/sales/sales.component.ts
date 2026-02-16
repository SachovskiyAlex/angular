import { Component, inject } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  private productsService = inject(ProductsService);

  public salesProducts$ = this.productsService
    .getList()
    .pipe(map((products) => products.filter((p) => p.priceWithDiscount)));
}
