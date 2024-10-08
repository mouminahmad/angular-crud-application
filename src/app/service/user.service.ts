import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://mouminahmad.github.io/angular_crud_json/db.json';
  constructor() {}

  http = inject(HttpClient);

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.apiUrl);
  }

  // Fetching a specific user by ID (for editing)
  getUserById(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.apiUrl}/${id}`);
  }

  // Updating a user by ID
  updateUser(user: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.apiUrl}/${user.id}`, user);
  }

  addUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiUrl, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
