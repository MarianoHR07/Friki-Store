import { Component } from '@angular/core';
import { Product } from './Product';
@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {

  // products:Product = {
  //   name:"Schneider",
  //   type:"Porter",
  //   price:3459.99,
  //   stock:37,
  //   image:"assets/img/Schneider-porter.jpg"
  // }
  products:Product[] = [   /// esto es un mock, nos sirve para debuguear, maquetar.
  // //Es decir, nos sirve para simular el comportamiento de la aplicacion sin pegarle a una appi o servidor
    {
      name:"Bitter Call Saul",
      type:"Ipa",
      price:4459.99,
      stock:0,
      image:"assets/img/session-ipa.jpg",
      clearance:false,
      buyQuantity:0,
    },
    {
      name:"Red Red Wine",
      type:"Barley Wine",
      price:5209.99,
      stock:7,
      image:"assets/img/goyeneche-red-honey.webp",
      clearance:false,
      buyQuantity:0,
    },
    {
      name:"Yellow Submarine",
      type:"Golden Ale",
      price:4759.98,
      stock:1,
      image:"assets/img/old-ale.png" ,
      clearance:true,
      buyQuantity:0,
    },
    {
      name:"Schneider",
      type:"Porter",
      price:3459.99,
      stock:37,
      image:"assets/img/schneider-porter.webp",
      clearance:false,
      buyQuantity:0,
    },
    {
      name: "Quilmes",
      type: "IPA",
      price: 222,
      stock:37,
      image: "assets/img/quilmes-ipa.jpg",
      clearance:true,
      buyQuantity:0,
    },
    {
      name: "Brama",
      type: "APA",
      price:4500,
      stock:1,
      image:  "assets/img/brahama-dorada.webp",
      clearance:false,
      buyQuantity:0,
    }
  ]
  
  product={
    "name":"Schneider",
    "type":"Porter",
    "price":3459.99,
    "stock":37,
    "image":"assets/img/schneider-porter.webp",
    clearance:true,
    buyQuantity:0,
  }

  title="Lista de Cervezas"

  maxReached($event:any,name:string){
    alert(`Se alcanzo el limite de unidades de ${name}`);
  }
}
