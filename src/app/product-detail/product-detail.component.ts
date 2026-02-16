import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  protected readonly Math = Math;
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  public product$ = this.route.params.pipe(
    switchMap((params) => this.productsService.getById(params['id'])),
  );
}
