import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../authentication-service';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss'
})
export class LogIn {
  placeholder ={
    username: 'nick-name | Alias',
    password: '',  
  }

  loginForm = new FormGroup(
    {
      // [Validators.required]: hasta que no complete el campo, el valor de username, queda en falso
      username : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required]),
      role : new FormControl('user'), // por defecto no tiene privilegios de admin
      // (CRUD de los productos), es decir, solo podra realizar compras.
    },  
  ) 

  error = false;

  constructor(private auth: AuthService){}

  onSubmit (){
    if(this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      const loged = this.auth.login(username ?? '', password ?? '')
      this.error=!loged
    }
  }

  isDirty(attr:string):boolean{
    const control = this.loginForm.get(attr);
    if (control?.dirty || control?.touched){
      return true 
    }
    return false
  }

  isInvalid(attr:string):boolean{
    const control = this.loginForm.get(attr);
    if (control?.invalid){
      return true 
    }
    return false
  }

// Handlers para los estilos de la clase control

  classInvalid(formField:string){
    return (this.isDirty(formField) && this.isInvalid(formField));
  }

  classValid(attr: string): boolean {
    const control = this.loginForm.get(attr);
    return !!(control && control.valid && (control.dirty || control.touched));
  }
}
