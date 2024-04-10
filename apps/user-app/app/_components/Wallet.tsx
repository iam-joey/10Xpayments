"use client";
import React, { useState } from "react";
import { createOnRampTransaction } from "../../lib/actions";
import { useRouter } from "next/navigation";

export function Wallet() {
  const [provider, setProvider] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const router = useRouter();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      setAmount(0);
    } else {
      setAmount(parsedValue);
    }
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
    router.refresh();
  };

  return (
    <div className="p-5 pt-2 border rounded-lg shadow-md">
      <h1 className="text-center"></h1>
      <form
        onSubmit={createOnRamp}
        className="mt-6 border-black max-w-sm mx-auto"
      >
        <div className="space-y-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <input
              className="flex w-full bg-white rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
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
