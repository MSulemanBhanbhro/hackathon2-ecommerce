import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  slug: string;
}

async function getData(): Promise<Product[]> {
    const query = `*[_type == "product" && image.asset != null]{
        _id,
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        price
    }`;
    

  try {
    const data = await client.fetch(query);
    console.log("Products fetched:", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

const ProductsPage = async () => {
  const data: Product[] = await getData();

  return (
    <section>
      <div className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
        <h1 className="text-2xl font-semibold">New Ceramics</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {data.length > 0 ? (
            data.map((product) => (
              <div className="w-full h-auto" key={product._id}>
                <Link href={`/products/${product._id}`}>
                  <Image
                    src={product.imageUrl}
                    height={700}
                    width={700}
                    alt={product.name}
                    className="w-full h-[80%] object-cover"
                  />
                </Link>
                <div className="mt-4 text-[#2A254B]">
                  <p className="py-2">{product.name}</p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </div>
        <div className="my-10 flex justify-center items-center">
          <button className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B]">
            View collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
