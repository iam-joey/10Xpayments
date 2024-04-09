import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/shadcn/table";

interface Payment {
  id: number;
  status: string;
  token: string;
  provider: string;
  amount: number;
  startTime: string; // Change type to string
  userId: number;
}

function getTimeAgo(date: Date) {
  // Change parameter type to Date
  const now = new Date();
  const diffMs = now.getTime() - date.getTime(); // Use getTime() to get milliseconds
  const diffMins = Math.round(diffMs / 60000);

  if (diffMins < 60) {
    return diffMins + " mins ago";
  } else {
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
      return diffHours + " hours ago";
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return diffDays + " days ago";
    }
  }
}

export function TransactionView({ transactions }: any) {
  return (
    <Table>
      <TableCaption className="uppercase text-2xl font-bold mb-3">
        History
      </TableCaption>
      <TableHeader>
        <TableRow className="grid grid-cols-4">
          <TableHead>Status</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((payment: Payment, index: number) => (
          <TableRow
            key={index}
            className="grid grid-cols-4 text-center border-b shadow-sm hover:bg-slate-200 p-2"
          >
            <TableCell
              className={`uppercase font-bold ${payment.status === "Processing" && "text-blue-600"} ${payment.status === "Success" && "text-green-800"}`}
            >
              {payment.status}
            </TableCell>
            <TableCell>{getTimeAgo(new Date(payment.startTime))}</TableCell>{" "}
            {/* Call getTimeAgo function */}
            <TableCell>{payment.provider}</TableCell>
            <TableCell>{payment.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
