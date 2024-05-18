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
    ingredients: IIngredient[];
    number: number;
    owner?: {
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    _id: string;
    status?: string;
    name?: string;
    createdAt: string;
    updatedAt: string;
    price: number
  };
  success: boolean;
}
