export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string
  };
  phone: string;
  __v: number;
  address: {
    geolocation: { lat: string; long: string };
    city: string;
    street: string;
    number: string;
    zipcode: string;
  }
};

export class Rating {
  rate: string;
  count: number;
}
