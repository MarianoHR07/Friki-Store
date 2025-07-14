import { Component } from '@angular/core';
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product-list/Product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  standalone: false,
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
// observer : observa el servicio product-cart
  
cartList$!: Observable<Product[]>; // $ es una convencion que hace referencia a que es un observable (y no el dato real) ==> para ello hay que usar un pipe
// en el parametro del constructor, injectamos el mismo servicio (la misma instancia del objeto) para shopping-cart y product-list
constructor(private cart: ProductCartService){
  // cart.cartList.subscribe(observable=> this.cartList = observable)
  this.cartList$= cart.cartList.asObservable(); // le pide a cart, que le genere el obserbable, y se lo instancia al observer (de tipo obserbable "cartList$")
}

 ngOnInit():void{

 }


}
