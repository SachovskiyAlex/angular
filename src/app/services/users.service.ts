import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Product } from '../product/product.interface';
import { Observable, map } from 'rxjs';
import { Contact, ContactForm } from '../contacts/contact.interface';
import { User, UserLogin } from '../auth/users.interface';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiService = inject(ApiService);

  public saveUser(data: User): Observable<User> {
    const encoded = btoa(data.password); // "SGVsbG8gV29ybGQ="
    //const decoded = atob(encoded);   // "Hello World"
    return this.apiService.post<User>('users', {
      name: data.name,
      email: data.email,
      password: encoded,
    });
  }
  public getUserByEmail(email: string): Observable<User | null> {
    return this.getUsers().pipe(
      map((users) => {
        let user;
        users.forEach((u) => {
          if (u.email === email) {
            user = u;
            return;
          }
        });

        return user ? user : null;
      }),
    );
  }
  public loginUser(email: string, password: string): Observable<User | null> {
    const encodedPassword = btoa(password);
    return this.getUsers().pipe(
      map((users) => {
        let user;
        users.forEach((u) => {
          if (u.email === email && u.password === encodedPassword) {
            user = u;
            return;
          }
        });

        //Todo: save user the to local storage or cookie
        return user ? user : null;
      }),
    );
  }

  public getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('users');
  }
}
//TODO: додати перевірку чи залогінений на пункт меню увійти
//TODO: якщо залогінений то мій профіль(акаунт) із пунктом logout
//TODO: доробити logout
