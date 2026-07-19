export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyPriceRange {
  minVariantPrice: ShopifyMoney;
  maxVariantPrice: ShopifyMoney;
}

export interface ShopifyCollectionNode {
  id: string;
  title: string;
  handle: string;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: ShopifyImage | null;
  priceRange: ShopifyPriceRange;
  availableForSale: boolean;
  collections: {
    edges: {
      node: ShopifyCollectionNode;
    }[];
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
}

export interface ShopifyCart {
  id: string;
  lines: ShopifyCartLine[];
}
