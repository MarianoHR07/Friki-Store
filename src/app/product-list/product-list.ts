import { Component } from '@angular/core';
import { Product } from './Product';
import { ProductCartService } from '../product-cart.service';
import { ProductDataService } from '../product-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

  title="Lista de Productos"
  dataList$!: Observable<Product[]>;
 
  constructor(
    private cartService: ProductCartService,
    private productDataService: ProductDataService
  ){      
    this.dataList$ = productDataService.dataList.asObservable();
  }
 
   addToCart(product:Product):void{
    // si el metodo del servicio que se invoque, modifica el estado del producto,
    // al invocar otro metodo de otro servicio, podria tener un comportamiento inesperado
    //  ==> si se piensa ejecutar metodos que modifican el estado del objeto y si ademas va a interactuar con mas
    //      de un servicio, lo mejor pasarle por parametro a cada servico un clon del objeto
   
    if(product.buyQuantity>0){
       //this.... ({...product}) lo copio antes de que productDataService.updateProductStock(product) propague el cambio a dataList$
          // esto evita que "this.cartService.addToCart(product)" le pasemos el dato con un stock incorrecto (al ejecutar 
          // updateProductStock(product), este propaga el cambio y la vista, obtiene el dato actualizado del servicio)
            // Esto se debe a que product es la referencia del producto que contiene _dataList del servicio, si modificamos el objeto, se
            // modifica la lista (de productDataService) y propaga la modificacion a la vista (de ProductList)
      const p:Product = {...product};
      this.productDataService.updateProductStock({...product})
      this.cartService.addToCart(p) // al pasar una copia por parametro, no importa el orden en que invoque los servicios, si no lo hiciera deberia invocarlos al revez.
      // si le paso this.cartService.addToCart({...product}) no realiza la copia y en este orden vuelve a descontar dos veces el buyQuantity devuelta
      product.buyQuantity = 0;
    }
  } 
 
  maxReached($event:any,name:string){
    alert(`Se alcanzo el limite de unidades de ${name}`);
  }
}