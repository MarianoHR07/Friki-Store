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
  constructor(private cartService: ProductCartService){
    // cartService.cartList.subscribe(observable=> this.cartList = observable)
    this.cartList$= cartService.cartList.asObservable(); // le pide a cart, que le genere el obserbable, y se lo instancia al observer (de tipo obserbable "cartList$")
  }

  ngOnInit():void{

  }

  makePurchase() {
    if (confirm("¿Desea confirmar su compra?")){
      this.cartService.buy().subscribe({
        next: () => {
          alert('Compra realizada con éxito 🎉');
          this.cartService.clearTheCart();
        },
        error: (err) => {
          console.error('Error al efectuar la compra', err);
          alert('Error al procesar la compra.');
        }
      });
    }
  }
}
