import { Products } from "src/app/products/models/products.model";
import { User } from "src/app/users/models/users.model";

export class Cart {
  id: number;
  userId: string;
  date: string;
  products: [{productId: number; quantity: number;}];
  __v: number;
  poductsData: ProductData[];
  userDetails: User;
};

export class ProductData {
  product: Products;
  quantity: number;
}
