import { Injectable } from '@angular/core';
import { Product } from './product-list/Product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// maneja la logica del carrito de compras

// observable: es el que es observado, y se encarga de avisarle que se produjo un cambio a los que lo observan
export class ProductCartService {

  // variable que queremos observar con el BehaviorSubject el _ es una convencion para indicar que es privada y poder usar el mismo nombre q el behavior subject
  private _cartList:Product[]=[] 
  
  // sirve para encapsular una variable(el arreglo _cartList que queremos notificar los cambios)
  cartList : BehaviorSubject<Product[]> = new BehaviorSubject(this._cartList);

  constructor() { }

  addToCart(product: Product) {
   
    if(product.buyQuantity!=0){
      let item: Product = this._cartList.find((obj)=> obj.name == product.name)!;
      if(!item){
      this._cartList.push({... product}) //{... obj} clona el objeto. notacion funcional (object destructuring)
      }else{
        item.buyQuantity += product.buyQuantity;
      }
      this.cartList.next(this._cartList); // el BehaviorSubject emite el cambio (emite el nuevo valor como emmit de eventos)
      
      console.log(this._cartList)
    }
  }
}
