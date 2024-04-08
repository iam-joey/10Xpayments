import React from "react";
import { Transactions } from "../../_components/TransactionsView";
import { Wallet } from "../../_components/Wallet";

function TransactionsPage() {
  return (
    <div
      className="border h-screen
    sm:h-[690px]  bg-blue-500 grid grid-flow-row sm:grid-cols-2"
    >
      <div className="bg-slate-200 flex justify-center items-center">
        <Wallet />
      </div>
      <div className="bg-slate-100 p-2 flex justify-center items-center">
        <Transactions />
      </div>
    </div>
  );
}

export default TransactionsPage;
