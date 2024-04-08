import { z } from "zod";

export const bankValidationSchema = z
  .object({
    token: z.string().nonempty(),
    userId: z.string().nonempty(),
    amount: z.string().nonempty(),
  })
  .refine((data) => {
    const allFieldsPresent =
      "token" in data && "userId" in data && "amount" in data;

    const allValuesNonEmptyStrings = Object.values(data).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );

    if (allFieldsPresent && allValuesNonEmptyStrings) {
      return true;
    } else {
      throw new Error(
        "All fields must be present and must be non-empty strings"
      );
    }
  });
