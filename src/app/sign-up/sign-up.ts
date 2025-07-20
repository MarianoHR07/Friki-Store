import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService, User } from '../authentication-service';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss'
})

export class SignUp {

  @Output() formSubmitted = new EventEmitter();
  
  MINpasswordLength = 8
  
  signUpForm = new FormGroup(
    {
      // [Validators.required]: hasta que no complete el campo, el valor de username, queda en falso
      username : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required, Validators.email]),
      firstName : new FormControl('',[Validators.required]),
      lastName : new FormControl('',[]),
      password : new FormControl('',[Validators.required, Validators.minLength(this.MINpasswordLength)]),
      confirmPassword : new FormControl('',[Validators.required]),
      role : new FormControl('user'), // por defecto no tiene privilegios de admin
    },
    [this.isMissmatch],  
  ) 

  succes = false;
  error = false;

  constructor(private auth:AuthService){

  }
  
  isMissmatch( control: AbstractControl):ValidationErrors | null {  // validaciones cruzadas a nivel form group
    if( (control.get('password')?.value !== control.get('confirmPassword')?.value)){
      return ({passwordMismatch:true})
    }
    return null
  }
  
  onSubmit() {
    if (this.signUpForm.valid) {
      // console.log(this.signUpForm.value);
      const formValue = this.signUpForm.value;

      const user: Omit<User,'id'>={
        username: formValue.username ?? '',
        email: formValue.email ?? '',
        password: formValue.password ?? '',
        role: formValue.role === 'admin' ? 'admin' : 'user',
      }
      //Le consulta al servicio si esta registrado
      const registered = this.auth.signUp(user)

      this.succes = registered;
      this.error = !registered;

      if(registered){ // Se encontraba registrado --> reseteo el formulario
        this.signUpForm.reset(
          {
            role:'user',
          }
        )
      }
    }
  }

  setDefaultValues() {   // Usuario para probar la aplicacion como  "usuario-final" 
    this.signUpForm.setValue(
      {
        username: 'commonUser',
        firstName: 'Common',
        lastName: 'User',
        email: 'demo@email.com',
        password: '@defaultUser',
        confirmPassword: '@defaultUser',
        role: 'user'
      }
    );
  }
  
  placeholder ={
    username: 'nick-name | Alias',
    firstName: 'ej: Bob',
    lastName: ' Senna',
    email: 'bob_Senna@email.com',
    password: '@sponge_456',
    confirmPassword: '@sponge_456',
      
  }

  isDirty(attr:string):boolean{
    const control = this.signUpForm.get(attr);
    if (control && control?.dirty || control?.touched){
      return true 
    }
    return false
  }

  isInvalid(attr:string):boolean{
    const control = this.signUpForm.get(attr);
    if (control && control?.invalid){
      return true 
    }
    return false
  }

// Handlers para los estilos de la clase control

  classInvalid(formField:string){
    return (this.isDirty(formField) && this.isInvalid(formField));
  }

  classValid(formField: string): boolean {
    const control = this.signUpForm.get(formField);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

}
