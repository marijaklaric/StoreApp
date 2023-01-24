export class Cart {
  id: number;
  userId: string;
  date: string;
  products: [{productId: number; quantity: number}];
  __v: number;
};

export class Rating {
 rate: string;
 count: number;
}
