export type TProduct = {
  id: string;
  images: string[];
  [key: string]: any;
};


export type TProductData = {
  id: string;
  category: string;
  name: string;
  type: string;
  image: string[];
  description: string;
  features: string[];
}


export type TRoofingSpecificationData = {
  thickness: string[];
  width: string;
  length: string;
  substrate: string;
  paintSystem: string;
  coatingThickness: string;
  colors: string[];
}

export type TRoofingProductData = {
  id: string;
  category: string;
  name: string;
  type: string;
  description: string;
  features: string[];
  colors: string[];
  images: string[];
  detailedDescription: TRoofingSpecificationData;
}

export type TDeckingProductData = {
  id: string;
  category: string;
  name: string;
  type: string;
  features: string[];
  images: string[];
  finishes?: string[];
  description: string;
  detailedDescription: TDeckingSpecificationData;
}

export type TDeckingSpecificationData = {
  material: string;
  thickness: string;
  width: string;
  length: string;
  surfaceTexture: string;
  maintenanceRequirements: string;
}