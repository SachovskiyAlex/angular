import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public isCatalogOpen = false;

  public toggleCatalog(): void {
    this.isCatalogOpen = !this.isCatalogOpen;
  }

  public closeCatalog(): void {
    this.isCatalogOpen = false;
  }
}
