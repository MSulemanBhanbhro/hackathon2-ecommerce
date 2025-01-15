import Image from 'next/image'
import Link from 'next/link'
import React from 'react';

interface Product {
 id:number;
 name: string;
 image: string;
 price: number;
}

const products:Product[] = [
    {
        id: 1,
        name: 'The Dendy Chair',
        image: '/images/chair.png',
        price: 250,
    },
    {
        id: 2,
        name: 'Rustic VaseSet',
        image: '/images/vase.png',
        price: 155,
    },
    {
        id: 3,
        name: 'The Silky Vase',
        image: '/images/silky.png',
        price: 125,
    },
    {
        id: 4,
        name: 'The Lucky Lamp',
        image: '/images/lamp.png',
        price: 399,
    },
   



]

const ProductsPage = () => {
    return (
        <>
            <section>
                <div className="px-4 md:px-8 py-12 text-[#2A254B] mt-12">
                    {/* Title */}
                    <h1 className="text-2xl font-semibold">New Ceramics</h1>

                    {/* Product Items */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                        {
                            products.map((product) => (
                                <div className="w-full h-auto" key={product.id}>
                                    <Link href={`/products/${product.id}`}>
                                    <Image
                                        src={product.image}
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
                        }


                    </div>

                    {/* View Collection Button */}
                    <div className="my-10 flex justify-center items-center">
                        <button className="bg-[#F9F9F9] py-4 px-6 rounded-[5px] text-[#2A254B]">
                            View collection
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductsPage;
