'use client';
import Image from "next/image";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../redux/store"; 
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';

const Shopping = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <>
      <section className="py-12 mt-12">
        <div className="w-[95%] sm:w-[90%] mx-auto border border-gray-300 rounded-lg p-4 sm:p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            {/* Products Section */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-lg sm:text-xl font-semibold mb-6">Products</h1>

              <ul className="list-none space-y-4">
                {cart.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 border rounded-md bg-white"
                  >
                    <Image
                      src={item.image}
                      width={900}
                      height={900}
                      alt={item.name}
                      className="rounded-md w-full sm:w-40 sm:h-40 lg:w-60 lg:h-80 object-cover"
                    />
                    <div className="flex-grow text-center sm:text-left">
                      <h1 className="text-base sm:text-lg font-semibold">{item.name}</h1>
                      <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                      <h1 className="text-sm sm:text-base font-bold">
                        ${item.price * item.quantity}
                      </h1>

                      <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                        <button
                          className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                          onClick={() => dispatch(decrementQuantity(String(item.id)))}
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                          onClick={() => dispatch(incrementQuantity(String(item.id)))}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="p-2 bg-red-500 text-white rounded-md mt-4 hover:bg-red-700 transition w-full sm:w-auto"
                        onClick={() => dispatch(removeFromCart(String(item.id)))}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg sm:text-xl font-bold mt-6">
                Total Items: {cart.totalQuantity}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Taxes and shipping are calculated at checkout.
              </p>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 bg-gray-50 rounded-lg p-4 sm:p-6">
              <h1 className="text-lg sm:text-xl font-semibold mb-6">Order Summary</h1>

              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-bold">${cart.items.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
              </div>

              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Total</p>
                <p className="font-bold">${cart.items.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
              </div>

              <button className="w-full bg-gray-800 text-white py-3 rounded-lg">
                Go to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shopping;
