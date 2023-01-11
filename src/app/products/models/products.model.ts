export class Products {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

export class Rating {
 rate: string;
 count: number;
}
