"use client";
import React, { useEffect, useState } from "react";
import { getBalance } from "../../lib/actions";

function BalanceCard() {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    async function main() {
      const val = await getBalance();
      //@ts-ignore
      setBalance(val.data.amount);
    }
    main();
  }, []);
  const handleGetBalance = async () => {
    const val = await getBalance();
    //@ts-ignore
    setBalance(val.data.amount);
  };
  return (
    <div className="my-4 p-5 rounded-lg shadow-md ">
      <div>
        <h1 className="text-center uppercase font-semibold">Balance</h1>
      </div>
      <div className="flex flex-col gap-2">
        <p className="">Your balance is : {balance} </p>
        <button
          type="button"
          onClick={handleGetBalance}
          className="uppercase p-2 bg-green-400 rounded-xl"
        >
          refresh
        </button>
      </div>
    </div>
  );
}

export default BalanceCard;
