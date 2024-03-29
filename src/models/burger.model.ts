export interface IIngredient {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  count?: number;
  uniqueId?: string;
  isDragging?: boolean;
  index?: number;
}

export interface IOrderResponse {
  name: string;
  order: {
    number: number
  };
  number: number;
  success: boolean;
}
