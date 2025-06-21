type ProductDisplay = {
  id: number;
  name: string;
  image: string;
  originalPrice: number;
  price: number;
  unit: string;
  brand: string;
};

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  unit: string;
  shortDescription: string;
  brandOrigin: string;
  manufacturer: string;
  countryOfManufacture: string;
  imageUrl: string;
  categoryId: number;
  details: {
    type: string;
    content: string;
  }[];
}
