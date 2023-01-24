export class Products {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  rate: string;
  count: number;
};

export class Rating {
 rate: string;
 count: number;
}
