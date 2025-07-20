import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User{
  id:number;
  username:string;
  email:string;
  password:string;
  role:'admin'|'user';
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _users : User[] = [
    {
      id:0,
      username:'admin',
      email:'admin@admin.com',
      password:'admin',
      role:'admin'
    },
  ]

  private _currentUser : BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null)

  public currentUser$ : Observable<User | null> = this._currentUser.asObservable();

  constructor() { }
  
  // Cuando un usuario se registra, incluye el nuevo usuario al arreglo-mokeado (para simular los datos de la API-Rest) 
  signUp(user:Omit<User,'id'>):boolean{
    if(this._users.find((u)=>u.email === user.email))
      return false;
    const newUser:User = {... user, id: this._users.length}
    this._users.push(newUser);
    return true;
  }

  login(username:string, password:string):boolean{
    const user = this._users.find((u)=>u.username === username && u.password === password)
    if(user){
      this._currentUser.next(user);
      return true;
    }
    return false;
  }
  
  logout():void{
    this._currentUser.next(null)
  }

  isAdmin():boolean{
    return this._currentUser.value?.role === 'admin';
  }
  getCurrent_UserID(): number | undefined{
    return this._currentUser.value?.id
  }
  getCurrent_UserName(): string | undefined{
    return this._currentUser.value?.username
  }
  getCurrent_UserEmail(): string | undefined{
    return this._currentUser.value?.email
  }
  
  

}
