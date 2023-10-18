import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../Models/api-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  addUser(value: Partial<{ loginId: string | null; email: string | null; firstName: string | null; lastName: string | null; password: string | null; confirmPassword: string | null; contactNumber: string | null; }>) {
    throw new Error('Method not implemented.');
  }
  baseUrl: string = environment.apiBaseUrl;

  loggedIn: boolean = localStorage.getItem("accessToken") != null ? true : false;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`https://localhost:7017/api/Authentication/Login`, data);
    
  }

  signUp(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.apiBaseUrl}/api/User/Create`, data)
  }
}
