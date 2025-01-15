'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';



type Product = {
  id: number;
  name: string;
  price: number;
  descriptionTitle: string;
  description: string;
  image: string;
  dimensionTitle: string;
  dimension: {
    height: number;
    width: number;
    depth: number;
  };
};

const products: Product[] = [
  {
    id: 1,
    name: "The Dandy Chair",
    price: 250,
    descriptionTitle: "Description",
    description: "The Dendy Chair combines comfort and contemporary design...",
    image: '/images/chair.png',
    dimensionTitle: "Dimensions",
    dimension: { height: 500, width: 75, depth: 50 },
  },
  {
    id: 2,
    name: "The Vase",
    price: 155,
    descriptionTitle: "Description",
    description: "The Vase is a timeless decorative piece...",
    image: '/images/vase.png',
    dimensionTitle: "Dimensions",
    dimension: { height: 500, width: 75, depth: 50 },
  },
  {
    id: 3,
    name: "The silky",
    price: 125,
    descriptionTitle: "Description",
    description: "The Silky Vase is a blend of elegance and simplicity, designed to bring a touch of refinement to your space. Its smooth, silky finish exudes sophistication, while the minimalist silhouette ensures versatility for any decor style. Perfect for showcasing fresh blooms, dried arrangements, or standing gracefully on its own, this vase adds charm and warmth to both modern and classic interiors.",
    image: '/images/silky.png',
    dimensionTitle: "Dimensions",
    dimension: { height: 500, width: 75, depth: 50 },

},
{
    id: 4,
    name: "The Lucky Lamp",
    price: 399,
    descriptionTitle: "Description",
    description: "The Lucky Lamp is a charming and functional lighting piece designed to add a warm, inviting glow to any room. With its elegant yet modern design, this lamp features a smooth, minimalist base and a soft, diffused light that creates a cozy atmosphere. Perfect for living rooms, bedrooms, or workspaces, The Lucky Lamp combines style and practicality, bringing both illumination and a touch of luck to your home. Its versatile design complements any decor, making it a timeless addition to your interiors.",
    image: '/images/lamp.png',
    dimensionTitle: "Dimensions",
    dimension: { height: 500, width: 75, depth: 50 },

}
];

const ProductListing = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const productId = Number(params.id);
  const product = products.find((prod) => prod.id === productId);

  const [popupVisible, setPopupVisible] = useState(false);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      description: product.description,
    }));

    // Show popup
    setPopupVisible(true);

    // Auto-close popup after 3 seconds
    setTimeout(() => {
      setPopupVisible(false);
    }, 3000);
  };

  return (
    <>
      <section>
        <div className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="w-full md:w-1/2 h-auto">
              <Image
                src={product.image}
                height={1000}
                width={1000}
                alt={product.name}
                className="w-full h-[50vh] md:h-[80vh] object-contain rounded-md"
              />
            </div>
            <div className="w-full md:w-1/2 px-4 md:px-10 py-6 flex flex-col justify-center">
              <div>
                <p className="text-xl md:text-2xl font-semibold">{product.name}</p>
                <p className="py-2 text-lg md:text-xl">${product.price}</p>
              </div>
              <div className="text-[#505977] text-sm md:text-base">
                <h1 className="font-semibold">{product.descriptionTitle}</h1>
                <div className="my-4 md:my-6">
                  <p>{product.description}</p>
                </div>

                <div className="my-8">
                  <h1 className="font-semibold">{product.dimensionTitle}</h1>
                </div>
                <div className="flex gap-12 md:gap-20 text-sm md:text-base">
                  <div>
                    <h1>Height</h1>
                    <p>{product.dimension.height}</p>
                  </div>
                  <div>
                    <h1>Width</h1>
                    <p>{product.dimension.width}</p>
                  </div>
                  <div>
                    <h1>Depth</h1>
                    <p>{product.dimension.depth}</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center mt-8">
                  <button
                    className="w-full md:w-[146px] h-[56px] bg-[#2A254B] text-white mt-4 md:mt-0"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Popup */}
          {popupVisible && (
            <div className="fixed top-[90px] right-0 transform -translate-x-1/2 bg-[#2A254B] text-white px-6 py-3 rounded-md shadow-lg z-50">
              Item added to cart!
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductListing;
