import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Nimi vaaditaan",
    }),
    password: string({
      required_error: "Nimi vaaditaan",
    }).min(6, "Salasana on liian lyhyt - pitää olla vähintään 6 pitkä"),
    passwordConfirmation: string({
      required_error: "passwordConfirmation vaaditaan",
    }),
    email: string({
      required_error: "Sähköposti vaaditaan",
    }).email("Sähköposti ei kelpaa"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Salasana ei mätsää!",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>["body"],
  "passwordConfirmation"
>;
