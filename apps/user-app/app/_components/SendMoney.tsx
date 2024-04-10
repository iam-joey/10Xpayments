"use client";
import React, { useState } from "react";
import { p2pTransfer } from "../../lib/actions";

interface SendMoneyProps {}

const SendMoney: React.FC<SendMoneyProps> = () => {
  const [amount, setAmount] = useState<number>(0);
  const [receiverEmail, setReceiverEmail] = useState<string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleReceiverEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReceiverEmail(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let a = await p2pTransfer(receiverEmail, amount);
    console.log(a);
    setAmount(0);
    setReceiverEmail("");
  };

  return (
    <div className="p-5 pt-2 border rounded-lg shadow-md">
      <h1 className="text-center"></h1>
      <form
        className="mt-6 border-black max-w-sm mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="space-y-5">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <input
              className="flex w-full bg-white rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="amount"
              placeholder="Enter Amount"
              value={amount.toString()}
              onChange={handleAmountChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <input
              className="flex w-full bg-white rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              id="receiverEmail"
              placeholder="Enter receiver email"
              value={receiverEmail}
              onChange={handleReceiverEmailChange}
            />
          </div>
          <div>
            <button className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
              Send Money
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendMoney;
