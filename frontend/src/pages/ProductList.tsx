import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Product {
  productId: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tuotelista</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.productId} className="p-4 bg-white shadow rounded-xl">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p>{p.description.substring(0, 100)}...</p>
            <p className="text-green-700 font-bold">{p.price} €</p>
            <div className="flex gap-2 mt-2">
              <Link
                to={`/products/edit/${p.productId}`}
                className="text-blue-600"
              >
                Muokkaa
              </Link>
              <button
                onClick={async () => {
                  await axios.delete(
                    `http://localhost:1337/api/products/${p.productId}`
                  );
                  setProducts(
                    products.filter((pr) => pr.productId !== p.productId)
                  );
                }}
                className="text-red-600"
              >
                Poista
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
