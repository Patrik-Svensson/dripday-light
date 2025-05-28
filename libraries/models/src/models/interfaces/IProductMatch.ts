interface IProductMatch {
  imageUrls: string[];
  thumbnailUrl: string;
  price: string;
  currency: string;
  name: string;
  color: string;
  brand: string;
  category: string;
  productLink: string;
  score: number;
  matchedImageUrl: string;
  searchImageUrl: string;
}

export { IProductMatch };
