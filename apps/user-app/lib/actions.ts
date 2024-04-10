"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import authOptions from "./auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number
) {
  const session = await getServerSession(authOptions);

  //@ts-ignore
  if (!session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  const token = (Math.random() * 1000).toString();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      //@ts-ignore
      userId: Number(session.user?.id),
      amount: amount,
    },
  });

  return {
    message: "Done",
  };
}

export async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);

  console.log(session);
  //@ts-ignore
  if (!session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const data = await prisma.onRampTransaction.findMany({
    where: {
      //@ts-ignore
      userId: session?.user?.id,
    },
    orderBy: {
      startTime: "desc",
    },
  });

  return { data };
}

export async function getBalance() {
  const session = await getServerSession(authOptions);

  console.log(session);
  //@ts-ignore
  if (!session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }

  const data = await prisma.balance.findFirst({
    where: {
      //@ts-ignore
      userId: session?.user.id,
    },
  });

  return { data };
}

export async function p2pTransfer(to: string, amount: number) {
  const session = await getServerSession(authOptions);
  //@ts-ignore
  const from = session?.user?.id;
  if (!from) {
    return {
      message: "Error while sending",
    };
  }
  console.log("inside ", from);

  const toUser = await prisma.user.findFirst({
    where: {
      email: to,
    },
  });
  console.log("inside ", toUser);
  if (!toUser) {
    return {
      message: "User not found",
    };
  }
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

    const fromBalance = await tx.balance.findUnique({
      where: { userId: Number(from) },
    });
    if (!fromBalance || fromBalance.amount < amount) {
      throw new Error("Insufficient funds");
    }

    await tx.balance.update({
      where: { userId: Number(from) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: toUser.id },
      data: { amount: { increment: amount } },
    });
  });
}
