import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product-list/Product';
@Component({
  selector: 'app-input-counter',
  standalone: false,
  templateUrl: './input-counter.html',
  styleUrl: './input-counter.scss'
})
export class InputCounter {
  // @Input()
  // product!: Product;
  
// TWO WAY DATA BINDING:(bananas en cajitas [(variable)]) es necesario configurarlo, ya que no estamos tratando con un objeto como lo haciamos con los Productos 
    // El input [variable] nos permite que funcionen los corchetes "el binding de la variable que entra al componente hijo"
  @Input() quantity!: number;
  @Input() max!: number;
    // El output (variable) por otra parte, manipula el binding de la variable de salida, permitiendo que se modifique el 
    // valor que se pasa por parametro, como si fuera por referencia "el binding de la variable que sale al componente padre" 
  @Output() quantityChange: EventEmitter<number>= new EventEmitter<number>; // Emisor de eventos, generamos nuestro propio evento 
  
  @Output() maxReached : EventEmitter<string>= new EventEmitter<string>; // evento que emitimos cada vez que el stock alcanza el maximo

  onlyNumbers: RegExp = /^[0-9]+$/;

  upQuantity():void{
    if(this.max){
      if( this.quantity < this.max){
        this.quantity++; // entrada por medio de los corchetes"[var]"
        this.quantityChange.emit(this.quantity); // two way data binding: salida por medio de los parentesis (var)
      }else {
        let default_message="maximum limit (max) has been reached";
        this.maxReached.emit(default_message) // devuelve el evento ($event), incluso si creo el EventEmitter de tipo objeto podria devolver un evento de este tipo de objeto
          // evento de salida para el componente input-counter
      } 
    }
  }
  downQuantity():void{
    if(this.quantity > 0){
      this.quantity--;
      this.quantityChange.emit(this.quantity) // emitimos el evento, esto devuelve la variable quantity modificada '(variable)="objeto.attr" '  
    }
  }
  
  onChangeQuantity(event: KeyboardEvent):void{
    // if(event.key==='Enter')
      //  if ( !(event.key>='0' && event.key<= this.max.toString())  ) 
      event.preventDefault;
      // if()
      console.log(event.detail)

  }


// Funciones para verificar input

  isValidInput(value:string, pattern:RegExp):boolean{  // funcion general
    return pattern.test(value)
  }
 
  // manejo del keyup para prevenir teclas erroneas
  validateKey(event:KeyboardEvent, pattern:RegExp):void{
    const key = event.key; // tecla que preciono el usuario
    const allowedKeys=['Backspace','Tab',"ArrowLeft","ArrowRight","Delete","ArrowUp","ArrowDown"];
   
    if(!this.isValidInput(key,pattern) && !allowedKeys.includes(key)){
      console.log(key+'  es in-valido')
      event.preventDefault();
    }else{ 
      console.log(key+'  es valido');
      this.quantityChange.emit(this.quantity); // en caso de que el usuario incremente/decremente con las flechas del teclado devuelve el valor de quantity actualizado
    }
  }

  // validar que cantidad que compra coincida con el stock "luego de haber validado el input manual (keyup|keydown)"
  validateQuantity(event:any):void{
    const input = event.target;
    let value = input.value;

    const quantity = this.quantity; // aca no puede ir value = input.value; ya que nosotros para [(ngModel)] usamos "quantity", probocaria 
    // que al actualizar esta variable, se vea desfasada con el input  por culpa de las funciones [up|down]Quantity"
    console.log('validateQuantity(event:any)<-- quantity ='+quantity)
    if (!quantity || isNaN(quantity) || (quantity<0)){
      console.log(quantity+'  NAN')
      this.quantity=0;
    } else if (+quantity> this.max){
      this.quantity = this.max
      input.value = this.quantity; // el input debe tomar el mismo valor de la cantidad 
      console.log('era mayor')
    } else if (+quantity != value){} // cambio el valor en el input 
    
  }
}
