import { Component } from '@angular/core';
import { AuthService, User } from './authentication-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'friki-store';  
  // showLoginForm=

  currentUser$!: Observable<User | null>;


  constructor (private auth:AuthService){
    this.currentUser$ = auth.currentUser$
  }

  userLoggedIn():boolean{
    return this.auth.isLoggedIn();
  }

  userLogOut():void{
    this.auth.logout();
  }
 
  userName():string{
    return this.auth.getCurrent_UserName() ?? '';
  }

}
