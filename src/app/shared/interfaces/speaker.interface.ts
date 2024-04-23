export interface Speaker {
  email: string;
  location: {
    city: string;
    country: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}
