import { Injectable, makeEnvironmentProviders } from '@angular/core';
import { Product } from './product-list/Product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { compileClassDebugInfo } from '@angular/compiler';

const URL = 'https://6875a134814c0dfa653901ab.mockapi.io/friki-store/api/products'

@Injectable({
  providedIn: 'root'
})

// Servicio de angular que va a consumir el servicio REST del back-end

export class ProductDataService {
  
  private _dataList: Product[] = [];
  dataList: BehaviorSubject<Product[]> = new BehaviorSubject(this._dataList);

  //  el servicio HttpClient, nos sirve para consumir la API (de Productos en nuestro caso) 
  //  y devuelve un observable de la respuesta del servidor
  constructor( private http:HttpClient ) {
    this.refreshList()
  } 

  public refreshList(): void {
    this.getAll().subscribe(
      (productos:Product[]) => {
        this._dataList = productos;
        this.dataList.next(this._dataList);
      }
    );
  } 

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(URL).pipe(
      map((products: Product[]) => products.map( (p) => ({ 
        // agrego buyQuantity: 0 y casteo [id, price, stock] a (Number) para asegurarme de que estoy trabajando con el tipo adecuado.
        ...p,
        id: Number(p.id),
        price: Number(p.price), 
        stock:Number(p.stock),
        buyQuantity: 0
      })))
    );
  }

  updateProductStock(product: Product) {
    let item:Product= this._dataList.find((i)=> (i.id == product.id))!;
    
    if(item && (item.stock >= product.buyQuantity)){  // "(item.stock >= product.buyQuantity)"<---chequear si es necesario, siendo q esta logica la controla el input-counter (creo q no es necesario)
      item.stock -= product.buyQuantity;
    }
    this.dataList.next(this._dataList);   // esto si esta comentado no me cambia nada por que ????
  }
  
} 
