import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SalesComponent } from './sales/sales.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'add-product', component: ProductAddComponent },
  { path: 'auth', component: AuthComponent },
];
