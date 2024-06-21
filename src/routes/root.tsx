import { useLoaderData } from "react-router-dom";
import { Product } from "../types/product";

export async function loader() {
  const response = await fetch("http://localhost:3000/products");
  const products: Product[] = await response.json();
  return { products };
}

export function RootRoute() {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <main>
      <h1>FigureOne Skates</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
