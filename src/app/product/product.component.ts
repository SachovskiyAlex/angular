import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  private productsService = inject(ProductsService);

  public products$ = this.productsService.getList();
}
