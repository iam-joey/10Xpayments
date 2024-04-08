import express, { Request } from "express";
import db from "@repo/db/client";
import { bankValidationSchema } from "./zod";
import httpStatus from "http-status";

const PORT = process.env.PORT_NUM || 3003;

const app = express();

app.use(express.json());

app.post("/hdfcWebhook", async (req: Request, res) => {
  const paymentInformation = bankValidationSchema.parse(req.body);

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(httpStatus.OK).json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(httpStatus.METHOD_NOT_ALLOWED).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(PORT, () => {
  console.log(`All good port is working on ${PORT} `);
});
