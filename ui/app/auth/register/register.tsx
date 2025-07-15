"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, z } from "zod";

const createUserSchema = object({
  name: string().min(1, "Nimi vaaditaan"),
  email: string().min(1, "Sähköposti vaaditaan").email("Sähköposti ei kelpaa"),
  password: string()
    .min(1, "Salasana vaaditaan")
    .min(6, "Salasana on liian lyhyt - pitää olla vähintään 6 merkkiä"),
  passwordConfirmation: string().min(1, "Salasanan vahvistus vaaditaan"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Salasanat eivät täsmää!",
  path: ["passwordConfirmation"],
});

type FormData = z.infer<typeof createUserSchema>;

function RegisterPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  });

  function onSubmit(values: FormData) {
    console.log({ values });
  }

  console.log({ errors });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-element">
          <label htmlFor="name">Nimi</label>
          <input id="name" type="text" {...register("name")} />
          <p>{errors.name?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="email">Sähköposti</label>
          <input id="email" type="email" {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Salasana</label>
          <input id="password" type="password" {...register("password")} />
          <p>{errors.password?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="passwordConfirmation">Salasanan vahvistus</label>
          <input
            id="passwordConfirmation"
            type="password"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>

        <button type="submit">VAHVISTA</button>
      </form>
    </>
  );
}

export default RegisterPage;
