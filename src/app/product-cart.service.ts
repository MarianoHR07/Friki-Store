import { Injectable } from '@angular/core';
import { Product, ProductDTO, toProduct, toProductDTO } from './product-list/Product';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const URL = 'https://6875a134814c0dfa653901ab.mockapi.io/friki-store/api/products'

@Injectable({
  providedIn: 'root'
})
// maneja la logica del carrito de compras

// observable: es el que es observado, y se encarga de avisarle que se produjo un cambio a los que lo observan
export class ProductCartService {

  // variable que queremos observar con el BehaviorSubject el _ es una convencion para indicar que es privada y poder usar el mismo nombre q el behavior subject
  private _cartList:Product[]=[] 
  private _cartTotal:number = 0
  // sirve para encapsular una variable(el arreglo _cartList que queremos notificar los cambios)
  cartList : BehaviorSubject<Product[]> = new BehaviorSubject(this._cartList);
  cartTotal : BehaviorSubject<number> = new BehaviorSubject(this._cartTotal);
  constructor(private http:HttpClient) { }

  // PUT - Actualizar producto 
  
  private updateProduct(id: string, product: ProductDTO): Observable<ProductDTO> {
    return this.http.put<ProductDTO>(`${URL}/${id}`, product);
  }

  //Actualiza el producto (cuando un usuario efectua la compra)

  buy(): Observable<Product[]> {  

    const updates :Observable<Product>[] = this._cartList.map(product => {
        const updatedProduct: Product = {
          ...product,
          stock: product.stock - product.buyQuantity,
          buyQuantity: 0
        };

        const dto: ProductDTO = toProductDTO(updatedProduct); // antes de enviar la peticion al servidor, lo formateo 

        return this.updateProduct(String(dto.id), dto).pipe(
          map((server_Pdto:ProductDTO) => toProduct(server_Pdto)) // devuelve Product con buyQuantity = 0
        );
    });

    return forkJoin(updates); // espera a que todos los PUT terminen para devolver el arreglo updates (Observable<Product>[])
  }

  clearTheCart() {
    this._cartList = [];
    this.cartList.next(this._cartList);
    //  resetear el total
    this._cartTotal = 0;
    this.cartTotal.next(this._cartTotal)
  }
 
  addToCart(product: Product) {
   
    if(product.buyQuantity!=0){
      let item: Product = this._cartList.find((cartItem)=> cartItem.id == product.id)!;
      if(!item){
        this._cartList.push({... product}) //{... obj} clona el objeto. notacion funcional (object destructuring)
        this._cartTotal += product.buyQuantity * product.price; 
        // console.log("TOTAL: $",this._cartTotal)/
      }else {
        if(product.buyQuantity <= product.stock){ // chequear si es necesario, siendo q esta logica la controla el input-counter (creo q no es necesario)
          item.buyQuantity += product.buyQuantity;
          this._cartTotal += product.buyQuantity * product.price; 
          // console.log("TOTAL: $",this._cartTotal)
        }
      }
      this.cartList.next(this._cartList); // el BehaviorSubject emite el cambio (emite el nuevo valor como emmit de eventos)
      this.cartTotal.next(this._cartTotal)
    }
    
  }

  removeFromCart(product:Product):number{
    let removeProduct : Product = this._cartList.find((cartItem)=> cartItem.id == product.id)!;
    if(removeProduct){
      this._cartList = this._cartList.filter((p)=> p.id !== removeProduct.id)
      // console.log(this._cartList);
      this.cartList.next(this._cartList)
      this._cartTotal -= removeProduct.buyQuantity * removeProduct.price; 
      this.cartTotal.next(this._cartTotal);
      return removeProduct.buyQuantity;
    }
    return 0;
  } 
}
