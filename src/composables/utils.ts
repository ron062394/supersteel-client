import type { TProduct } from "../types/products";

export function getRandomItems<T>(items: T[], count: number): T[] {
  return [...items].sort(() => 0.5 - Math.random()).slice(0, count);
}

export function getRelatedProducts(
  products: TProduct[],
  currentProductId: string,
  count: number = 3
): TProduct[] {
  if (!Array.isArray(products)) {
    console.error("Product data is not an array");
    return [];
  }

  const filtered = products.filter((p) => p.id !== currentProductId);
  const random = getRandomItems(filtered, count);

  return random.map((product) => ({
    ...product,
    images: product.images.map((img) => img.replace("./", "/")),
  }));
}

export function getProductById<T extends TProduct>(
  products: T[],
  id: string
): T | null {
  if (!id) {
    console.error("Product ID is undefined");
    return null;
  }

  const found = products.find((p) => p.id === id);
  if (!found) {
    console.error("Product not found");
    return null;
  }

  return {
    ...found,
    images: found.images.map((img) => img.replace("./", "/")),
  };
}
