import { Injectable } from '@angular/core';
import { Product } from './product-list/Product';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const URL = 'https://6875a134814c0dfa653901ab.mockapi.io/friki-store/api/products'

@Injectable({
  providedIn: 'root'
})

// Servicio de angular que va a consumir el servicio REST del back-end

export class ProductDataService {

  //  consume la API de Productos y devuelve un observable de la respuesta
  constructor( private http:HttpClient ) { }
  
  getAll():Observable<Product[]>{ //consume la appiRest
    return this.http.get<Product[]>(URL).pipe(
      // el tap realiza la operacion de transformacion (seteandole a cada producto -> buyQuantity en 0)
      tap(
        (products : Product[]) => 
          products.forEach( (prod) => (prod.buyQuantity = 0) 
        )
      )
    );
  }
}

