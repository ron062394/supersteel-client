export type TRoofingSpecificationData = {
  thickness: string[];
  width: string;
  length: string;
  substrate: string;
  paintSystem: string;
  coatingThickness: string;
  colors: string[];
}

export type TRoofingProduct = {
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
