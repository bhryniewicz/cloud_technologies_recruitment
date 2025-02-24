import { Dayjs } from "dayjs";
import { z } from "zod";
import { getAdvertisements } from "../../hooks/useAdvertisments";

export const FormSchema = (mode: "add" | "edit") =>
    z.object({
      name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .superRefine((name, ctx) => {
          if (mode === "add") {
            const storedAds = getAdvertisements();
            if (storedAds.some((ad) => ad.name.toLowerCase() === name.toLowerCase())) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "An advertisement with this name already exists",
              });
            }
          }
        }),
      description: z
        .string()
        .trim()
        .min(1, "Description is required")
        .max(500, "Description must be at most 500 characters"),
      start_date: z.custom<Dayjs>(),
      end_date: z.custom<Dayjs>(),
    });

    export type FormValues = z.infer<ReturnType<typeof FormSchema>>;
