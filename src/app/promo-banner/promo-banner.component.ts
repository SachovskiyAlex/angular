import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss',
})
export class PromoBannerComponent implements OnInit, OnDestroy {
  banners = [
    {
      badge: 'Новинка',
      title: 'IPHONE 17 PRO ВІД ОФІЦІЙНОГО ДИЛЕРА',
      subtitle: 'з безкоштовною доставкою по Україні від 1 дня',
      image: '/Apple17.png',
      class: 'iphone-gradient',
    },
    {
      badge: 'Новинка',
      title: 'SAMSUNG S26 - МАЙБУТНЄ ВЖЕ ТУТ',
      subtitle: 'Отримуйте бонуси при купівлі у офіційного представника',
      image: '/Sam1.png',
      class: 'samsung-gradient',
    },
  ];

  currentIndex = 0;
  private intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 15000);
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.banners.length) % this.banners.length;
  }
}
