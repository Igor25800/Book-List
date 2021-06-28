import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IUser } from '../../interfaces/user.interfaces';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  getArr$ :Subject<any> = new Subject()

  private url: string;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/users';
  }
  getUser(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.url);
  }

  addUser(users: IUser): Observable<Array<IUser>> {
    return this.http.post<Array<IUser>>(this.url, users);
  }

  updateUser(user: IUser): Observable<Array<User>> {
    return this.http.put<Array<IUser>>(`${this.url}/${user.id}`, user);
  }

  deleteUser(user:IUser): Observable<Array<IUser>> {
    return this.http.delete<Array<IUser>>(`${this.url}/${user.id}`);
  }

}
