import React from "react";
import { TransactionView } from "../../_components/TransactionsView";
import { Wallet } from "../../_components/Wallet";
import { getOnRampTransactions } from "../../../lib/actions";
import BalanceCard from "../../_components/BalanceCard";

async function TransactionsPage() {
  const transactions = await getOnRampTransactions();

  return (
    <div
      className="border h-screen
    sm:h-[690px]  bg-blue-500 grid grid-flow-row sm:grid-cols-2"
    >
      <div className="bg-slate-200  grid grid-cols-subgrid p-4 ">
        <div className=" shrink-0 flex justify-center items-center">
          <BalanceCard />
        </div>
        <div className=" shrink-0 flex justify-center items-center">
          <Wallet />
        </div>
      </div>
      <div className="bg-slate-100 ">
        <TransactionView transactions={transactions.data} />
      </div>
    </div>
  );
}

export default TransactionsPage;
