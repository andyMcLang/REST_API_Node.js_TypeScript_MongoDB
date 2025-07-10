import { object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Sähköpostiosoite vaaditaan",
    }),
    password: string({
      required_error: "Salasana vaaditaan",
    }),
  }),
});
