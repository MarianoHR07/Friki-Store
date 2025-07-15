import { Component } from '@angular/core';
import { Product } from './Product';
import { ProductCartService } from '../product-cart.service';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

  title="Lista de Cervezas"

  products:Product[]=[]
  // para comunicar los componentes: shopping-cart y product-list
  // injectamos el mismo servicio (la misma instancia del objeto)  
  constructor(
    private cart: ProductCartService,
    private productDataService: ProductDataService
  ){  }

  ngOnInit():void{ // ciclo de vida, pequeñas funciones conocidas como hooks, (que se disparan cuando el componente aparece pantalla) 
    // si no uso solamente la info para el template, necesito hacerlo por medio de suscribe
    
    // una opcion para suscribirnos a un obserbable, es suscribirnos a un servicio
    this.productDataService.getAll()
    .subscribe( (products) => (this.products = products))   //me suscribo (con una funcion anonima), para obtener el valor que esta emitiendo el observable 
    // el arreglo de productos, se convierte en el q viene desde el servicio 
  }
  
  ngOnDestroy(){
    // Si me subscribo, cuando lo dejo de usar, necesito desuscribirme (ng destroy)
  }

  addToCart(product:Product):void{
    this.cart.addToCart(product)
    product.stock -= product.buyQuantity;
    product.buyQuantity=0;
  }

  refreshStock(){   /// usar para cuando cambia de pagina
  
  }
  
  maxReached($event:any,name:string){
    alert(`Se alcanzo el limite de unidades de ${name}`);
  }
}