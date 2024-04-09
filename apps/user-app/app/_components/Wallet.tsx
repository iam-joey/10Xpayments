"use client";
import React, { useState } from "react";
import { createOnRampTransaction } from "../../lib/actions";

export function Wallet() {
  const [provider, setProvider] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setAmount(parseFloat(value)); // Parse string to float
  };

  const paymentDetails = [
    {
      value: "HDFC",
      name: "HDFC",
    },
    {
      value: "SBI",
      name: "SBI",
    },
    {
      value: "UPI",
      name: "UPI",
    },
    {
      value: "CARD",
      name: "CARD",
    },
  ];

  const createOnRamp = async (e: any) => {
    e.preventDefault();
    if (!amount) {
      return alert("Enter amount more than 0");
    }

    if (!provider) {
      return alert("Please choose payment method again");
    }

    const value = await createOnRampTransaction(provider, amount);
  };
  return (
    <div className=" p-5   rounded-lg shadow-md">
      <h1 className="text-center "></h1>
      <form
        onSubmit={createOnRamp}
        className="mt-6  border-black max-w-sm mx-auto "
      >
        <div className="space-y-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <input
              className="flex w-full bg-white rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400  focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="name"
              placeholder="Enter your Amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <select onChange={(e) => setProvider(e.target.value)}>
              {paymentDetails.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Add To Wallet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
