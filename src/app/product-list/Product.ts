export interface Product{ // export me permite que la interface sea publica y puede importarse 
    name: string;
    type: string;
    price: number;
    stock: number;
    image: string;
    clearance: boolean;   //product.clearance_sale promocion de cervezas
    buyQuantity :number;
  }