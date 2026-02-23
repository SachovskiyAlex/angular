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

  public post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(this.getFullPath(path), body);
  }

  public delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(this.getFullPath(path));
  }

  public put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(this.getFullPath(path), body);
  }
}
