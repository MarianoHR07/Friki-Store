import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  protected title = 'brewery';  
  // el componente app esta definiendo una propiedad/ attributo 
  // y toda propiedad de caracter publico que esta en el componente la podemos usar e incluir en el Html
}
