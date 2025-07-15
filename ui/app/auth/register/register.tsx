"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";

const createUserSchema = object({
  name: string().nonempty({ message: "Nimi vaaditaan" }),
  email: string()
    .nonempty({ message: "Sähköposti vaaditaan" })
    .email("Sähköposti ei kelpaa"),
  password: string()
    .nonempty({ message: "Salasana vaaditaan" })
    .min(6, "Salasana on liian lyhyt - pitää olla vähintään 6 merkkiä"),
  passwordConfirmation: string().min(1, "Salasanan vahvistus vaaditaan"),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Salasanat eivät täsmää!",
  path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  async function onSubmit(values: CreateUserInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        values
      );
      router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setRegisterError(e.response?.data.message || e.message);
      } else {
        setRegisterError("Tuntematon virhe");
      }
    }
  }

  console.log({ errors });

  return (
    <>
      {registerError && <p className="text-red-500">{registerError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <div className="form-element">
          <label htmlFor="name">Nimi</label>
          <input
            id="name"
            type="text"
            placeholder="nimi"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="email">Sähköposti</label>
          <input
            id="email"
            type="email"
            placeholder="email@email.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="password">Salasana</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>

        <div className="form-element">
          <label htmlFor="passwordConfirmation">Salasanan vahvistus</label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="********"
            {...register("passwordConfirmation")}
          />
          <p>{errors.passwordConfirmation?.message}</p>
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          VAHVISTA
        </button>
      </form>
    </>
  );
}

export default RegisterPage;
