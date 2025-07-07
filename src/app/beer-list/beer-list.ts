import { Component } from '@angular/core';
import { Beer } from './Beer';
@Component({
  selector: 'app-beer-list',
  standalone: false,
  templateUrl: './beer-list.html',
  styleUrl: './beer-list.scss'
})
export class BeerList {
  
  
  // beers:Beer = {
  //   name:"Schneider",
  //   type:"Porter",
  //   price:3459.99,
  //   stock:37,
  //   image:"assets/img/Schneider-porter.jpg"
  // }
  beers:Beer[] = [   /// esto es un mock, nos sirve para debuguear, maquetar.
  // //Es decir, nos sirve para simular el comportamiento de la aplicacion sin pegarle a una appi o servidor
    {
      name:"Bitter Call Saul",
      type:"Ipa",
      price:4459.99,
      stock:0,
      image:"assets/img/session-ipa.jpg",
      clearance:false,
    },
    {
      name:"Red Red Wine",
      type:"Barley Wine",
      price:5209.99,
      stock:7,
      image:"assets/img/goyeneche-red-honey.webp",
      clearance:false,
    },
    {
      name:"Yellow Submarine",
      type:"Golden Ale",
      price:4759.98,
      stock:1,
      image:"assets/img/old-ale.png" ,
      clearance:true,
    },
    {
      name:"Schneider",
      type:"Porter",
      price:3459.99,
      stock:37,
      image:"assets/img/schneider-porter.webp",
      clearance:false,
    },
    {
      name: "Quilmes",
      type: "IPA",
      price: 222,
      stock:37,
      image: "assets/img/quilmes-ipa.jpg",
      clearance:true,
    },
    {
      name: "Brama",
      type: "APA",
      price:4500,
      stock:1,
      image:  "assets/img/brahama-dorada.webp",
      clearance:false,
    }
  ]
  
  beer={
    "name":"Schneider",
    "type":"Porter",
    "price":3459.99,
    "stock":37,
    "image":"assets/img/schneider-porter.webp",
    clearance:true,
  }

  
  title="Lista de Cervezas"
}
