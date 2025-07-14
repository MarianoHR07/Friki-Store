import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product-list/Product';
@Component({
  selector: 'app-input-counter',
  standalone: false,
  templateUrl: './input-counter.html',
  styleUrl: './input-counter.scss'
})
export class InputCounter {
  // @Input() comunica o le permite transmitir al componente padre (el que lo utiliza) una variable u objeto para que este componente hijo, pueda hacer uso de la misma
  // product!: Product;
  
// TWO WAY DATA BINDING:(bananas en cajitas [(variable)]) es necesario configurarlo, ya que no estamos tratando con un objeto como lo haciamos con los Productos 
    // El input [variable] nos permite que funcionen los corchetes "el binding de la variable que entra al componente hijo"
  @Input() quantity!: number;
  @Input() max!: number;
    // El output (variable) por otra parte, manipula el binding de la variable de salida, permitiendo que se modifique el 
    // valor que se pasa por parametro, como si fuera por referencia "el binding de la variable que sale al componente padre" 
  @Output() quantityChange: EventEmitter<number>= new EventEmitter<number>; // Emisor de eventos, generamos nuestro propio evento 
  // [(quantity)]="product.buyQuantity"  es  two way data binding ya que el input permite el pasaje por parametro en input-counter, y 
  // el output implicitamente actualiza el valor (product.buyQuantity = this.quantityChange.emit(this.quantity))
  
  @Output() maxReached : EventEmitter<string>= new EventEmitter<string>; // evento que emitimos cada vez que el stock alcanza el maximo

  private warning_maxReached="maximum limit (max) has been reached";
  onlyNumbers: RegExp = /^[0-9]+$/;

  upQuantity():void{
    if(this.max){
      if( this.quantity < this.max){
        this.quantity++; // entrada por medio de los corchetes"[var]"
        this.quantityChange.emit(this.quantity); // two way data binding: salida por medio de los parentesis (var)
      }else {
        console.log('[quantity]: ',this.quantity, " >>>> ", this.max,":[max]")
        this.maxReached.emit(this.warning_maxReached) // devuelve un evento de salida tradicional ($event), incluso si creo el EventEmitter de tipo objeto podria devolver un evento de este tipo de objeto
          // evento de salida para el componente input-counter, este puede ser reutilizado como en el caso de (maxReached)="maxReached($event, `${product.name}-${product.type}`)">
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
      if(this.quantity > this.max) {this.maxReached.emit(this.warning_maxReached)}
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
      console.log(quantity+'  [0|false|NAN]')
      this.quantity=0;
      input.value = this.quantity; // evita que pueda escribir multiples 0's
      this.quantityChange.emit(this.quantity);
    } else if (+quantity> this.max){
      this.quantity = this.max
      input.value = this.quantity; // el input debe tomar el mismo valor de la cantidad para evitar que pueda ingresar numeros que superen el stock
                                    // ej: si max=7 y quiero ingresar quantity = 9 , el valor de this.quantity se volvera 
                                    // this.quantity=7 e [input]=7 , 
                                    // pero el problema es que el input si se intenta ingresar nuevamente => this.quantity=7 pero el campo del input tendra el valor [input]=79 
      this.quantityChange.emit(this.quantity);
      this.maxReached.emit(this.warning_maxReached)
    }
    
  }
}
