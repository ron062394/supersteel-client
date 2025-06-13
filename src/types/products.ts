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


export type TBendedProductData = {
  id: string;
  name: string;
  category: string;
  type: string;
  images: string[];
  features: string[];
  description: string;
  detailedDescription: TBendedSpecificationData;
}


export type TBendedSpecificationData = {
  material: string;
  thickness: string;
  length: string;
  width: string;
  finish: string;
}
export type TLightFramesProductData = {
  id: string;
  name: string;
  category: string;
  type: string;
  images: string[];
  features: string[];
  description: string;
  detailedDescription: TLightFramesSpecificationData;
}

export type TLightFramesSpecificationData = {
  material: string;
  thickness: string;
  length: string;
  width: string;
  finish: string;
}

export type TSpandrelProductData = {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  images: string[];
  features: string[];
  colors: string[];
  detailedDescription: TSpandrelSpecificationData;
}

export type TSpandrelSpecificationData = {
  material: string;
  thickness: string;
  width: string;
  length: string;
  finish: string;
}