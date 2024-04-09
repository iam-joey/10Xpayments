import db from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, userId, amount } = await req.json();

  await db.$transaction([
    db.balance.update({
      where: {
        userId: Number(userId),
      },
      data: {
        amount: {
          increment: Number(amount),
        },
      },
    }),
    db.onRampTransaction.update({
      where: {
        token: token,
      },
      data: {
        status: "Success",
      },
    }),
  ]);
  console.log("here");
  return NextResponse.json(
    {
      msg: "ALL GOOD",
    },
    {
      status: 201,
    }
  );
}
