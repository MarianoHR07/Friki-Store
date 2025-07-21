import { Component } from '@angular/core';
import { ProductCartService } from '../product-cart.service';
import { Product } from '../product-list/Product';
import { Observable } from 'rxjs';
import { ProductDataService } from '../product-data.service';
import { AuthService, User } from '../authentication-service';

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
  total$!: Observable<number>;
  currentUser$!: Observable<User | null>;


  constructor(
    private cartService: ProductCartService,
    private productDataService : ProductDataService,
    public auth: AuthService,
  ){
    // cartService.cartList.subscribe(observable=> this.cartList = observable)
    this.cartList$= cartService.cartList.asObservable(); // le pide a cart, que le genere el obserbable, y se lo instancia al observer (de tipo obserbable "cartList$")
    this.total$ = cartService.cartTotal.asObservable();
    this.currentUser$= auth.currentUser$;
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

  removeFromCart(product:Product):void {
    const removedQuantity= this.cartService.removeFromCart(product);
    // quizas esto deberia hacerlo el servicio del carrito cuando llama a removeFromCart ("dataService, suscripto al los cambios de ProductCartService") y la misma logica aplicaria al addToCart de la lista
    this.productDataService.restoreProductStock(product.id, removedQuantity);
  }
}
