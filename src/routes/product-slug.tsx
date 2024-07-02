import { type LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import { Product } from "../types";
import { backendURL } from "../utils/env";

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  if (!slug) return { product: null };

  try {
    const response = await fetch(`${backendURL}/products/${slug}`);
    const product: Product = await response.json();
    return { product };
  } catch (error) {
    console.error(error);
    return { product: null };
  }
}

export function ProductSlugRoute() {
  const { product } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  if (!product) {
    return (
      <div>
        <h4>Product not found</h4>
      </div>
    );
  }

  return (
    <div>
      <img src={product.imageURL} alt={product.name} width={200} height={200} />
      <h4>{product.name}</h4>
    </div>
  );
}
