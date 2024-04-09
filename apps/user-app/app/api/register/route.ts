import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

import db from "@repo/db/client";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, number } = await req.json();

    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { number }],
      },
    });

    if (existingUser) {
      let errorMessage = "";
      if (existingUser.email === email) {
        errorMessage = "User with this email already exists";
      }
      if (existingUser.number === number) {
        errorMessage += errorMessage ? " and " : "";
        errorMessage += "User with this number already exists";
      }

      return NextResponse.json(
        {
          err: errorMessage,
        },
        {
          status: httpStatus.CONFLICT,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        number,
        password: hashedPassword,
        Balance: {
          create: {
            amount: 0,
            locked: 0,
          },
        },
      },
    });

    return NextResponse.json(
      {
        user,
      },
      {
        status: httpStatus.CREATED,
      }
    );
  } catch (error) {}
}
