export interface Beer{ // export me permite que la interface sea publica y puede importarse 
    name: string;
    type: string;
    price: number;
    stock: number;
    image: string;
    clearance: boolean;   //beer.clearance_sale promocion de servezas
  }