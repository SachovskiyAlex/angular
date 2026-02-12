import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  public getFullPath(path: string): string {
    return this.baseUrl + path;
  }

  public get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.getFullPath(path));
  }
}
