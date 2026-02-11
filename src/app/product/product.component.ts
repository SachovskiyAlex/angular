import { Component } from '@angular/core';
import { Product } from './product.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  public products: Product[] = [
    {
      id: 1,
      title: 'iPhone 15',
      price: 54000,
      // priceWithDiscount: 899,
      img: 'Apple.png',
      battery: '5000 мАч',
      memorry: '12 ГБ',
      hdd: '256 ГБ',
      cameraMain: '48 Мп',
      cameraFront: '12 Мп',
      description:
        'Современный смартфон iPhone 15 с отличной камерой и мощным процессором.',
      isHit: true,
    },
    {
      id: 2,
      title: 'iPhone 16',
      price: 56200,
      priceWithDiscount: 50000,
      img: 'Apple.png',
      battery: '5000 мАч',
      memorry: '16 ГБ',
      hdd: '512 ГБ',
      cameraMain: '48 Мп',
      cameraFront: '12 Мп',
      description:
        'Современный смартфон iPhone 15 с отличной камерой и мощным процессором.',
      isNew: true,
    },
    {
      id: 3,
      title: 'iPhone 17',
      price: 56000,
      priceWithDiscount: 51000,
      img: 'Apple.png',
      battery: '5000 мАч',
      memorry: '32 ГБ',
      hdd: '1 ТБ',
      cameraMain: '48 Мп',
      cameraFront: '12 Мп',
      description:
        'Современный смартфон iPhone 15 с отличной камерой и мощным процессором.',
      isNew: true,
    },
  ];
}
