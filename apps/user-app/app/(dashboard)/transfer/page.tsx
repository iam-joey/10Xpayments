import React, { useEffect, useState } from "react";
import { TransactionView } from "../../_components/TransactionsView";
import { Wallet } from "../../_components/Wallet";
import { getOnRampTransactions } from "../../../lib/actions";

async function TransactionsPage() {
  const transactions = await getOnRampTransactions();

  return (
    <div
      className="border h-screen
    sm:h-[690px]  bg-blue-500 grid grid-flow-row sm:grid-cols-2"
    >
      <div className="bg-slate-200  grid grid-flow-row p-4 ">
        <Wallet />
      </div>
      <div className="bg-slate-100 ">
        <TransactionView transactions={transactions.data} />
      </div>
    </div>
  );
}

export default TransactionsPage;
