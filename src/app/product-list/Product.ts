// Product: Interfaz para interactuar con la interfaz de usuario(UI) de la aplicacion (front-end)
export interface Product{  
    id:number;  
    name: string;
    type: string;
    price: number;
    stock: number;
    image: string;
    clearance: boolean;   //productos en oferta
    buyQuantity :number;
}

// ProductDTO: modelo que espera el backend - sin incluir lógica de negocio, solo datos estructurados.
export type ProductDTO = Omit<Product, 'buyQuantity'>; // DTO: (Data Transfer Object)  

export function toProductDTO(product: Product): ProductDTO {
  const { buyQuantity, ...dto } = product; //usamos destructuring para quitar buyQuantity antes de crear el DTO
  return dto;
}  

export function toProduct(dto: ProductDTO): Product {
  return {
    ...dto,
    buyQuantity: 0
  };
}