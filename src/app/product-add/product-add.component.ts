import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Product } from '../product/product.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.scss',
})
export class ProductAddComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);

  products: Product[] = [];

  productForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    priceWithDiscount: [null],
    img: ['', Validators.required],
    battery: [''],
    memorry: [''],
    hdd: [''],
    cameraMain: [''],
    cameraFront: [''],
    display: [''],
    color: [''],
    processor: [''],
    description: ['', Validators.required],
    isNew: [false],
    isHit: [false],
  });

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getList().subscribe((data) => {
      this.products = data;
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productsService.addProduct(this.productForm.value as any).subscribe({
        next: () => {
          this.productForm.reset({ price: 0, isNew: false, isHit: false });
          this.loadProducts();
        },
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('Видалити цей товар?')) {
      this.productsService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
      });
    }
  }
}
