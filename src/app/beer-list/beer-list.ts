import { Component } from '@angular/core';
import { Beer } from './Beer';
@Component({
  selector: 'app-beer-list',
  standalone: false,
  templateUrl: './beer-list.html',
  styleUrl: './beer-list.scss'
})
export class BeerList {
  onlyNumbers: RegExp = /^[0-9]+$/;
  
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
  
  beer={
    "name":"Schneider",
    "type":"Porter",
    "price":3459.99,
    "stock":37,
    "image":"assets/img/schneider-porter.webp",
    clearance:true,
    buyQuantity:0,
  }

  
  title="Lista de Cervezas"

  upQuantity(beer:Beer):void{
    if( beer.stock && (beer.buyQuantity < beer.stock))
          beer.buyQuantity++;
  }
  downQuantity(beer:Beer):void{
    if(beer.buyQuantity>0)
      beer.buyQuantity--;
  }
  
  onChangeQuantity(event: KeyboardEvent, beer:Beer):void{
    // if(event.key==='Enter')
      //  if ( !(event.key>='0' && event.key<= beer.stock.toString())  ) 
      event.preventDefault;
      // if()
      console.log(event.detail)

  }


// Funciones para verificar input

  isValidInput(value:string, pattern:RegExp):boolean{  // funcion general
    return pattern.test(value)
  }
 
  // manejo del keyup para prevenir teclas erroneas
  validateKey(event:KeyboardEvent, pattern:RegExp):void{
    const key = event.key; // tecla que preciono el usuario
    const allowedKeys=['Backspace','Tab',"ArrowLeft","ArrowRight","Delete"];
   
    if(!this.isValidInput(key,pattern) && ! allowedKeys.includes(key)){
      console.log(key+'  es in-valido')
      event.preventDefault();
    }
  }

  // validar que cantidad que compra coincida con el stock "luego de haber validado el input manual (keyup|keydown)"
  validateQuantity(event:any, beer:Beer):void{
    const input = event.target;
    let value = input.value;

    const quantity = beer.buyQuantity; // aca no puede ir value = input.value; ya que nosotros para [(ngModel)] usamos "beer.buyQuantity", probocaria 
    // que al actualizar esta variable, se vea desfasada con el input  por culpa de las funciones [up|down]Quantity"
    console.log(quantity+'  validar cantidad')
    if (!quantity || isNaN(quantity) || (quantity<0)){
      console.log(quantity+'  NAN')
      beer.buyQuantity=0;
    } else if (+quantity> beer.stock){
      beer.buyQuantity = beer.stock
      input.value = beer.buyQuantity; // el input debe tomar el mismo valor del objeto cerveza  
      console.log('era mayor')
    }
    
  }
 


}
