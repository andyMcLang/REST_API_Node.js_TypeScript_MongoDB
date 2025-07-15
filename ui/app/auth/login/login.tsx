"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";

const createSessionSchema = object({
  email: string()
    .nonempty({ message: "Sähköposti vaaditaan" })
    .email("Sähköposti ei kelpaa"),
  password: string()
    .nonempty({ message: "Salasana vaaditaan" })
    .min(6, "Salasana on liian lyhyt - pitää olla vähintään 6 merkkiä"),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function LoginPage() {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  async function onSubmit(values: CreateSessionInput) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true }
      );
      router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setLoginError(e.response?.data.message || e.message);
      } else {
        setLoginError("Tuntematon virhe");
      }
    }
  }

  console.log({ errors });

  return (
    <>
      {loginError && <p className="text-red-500">{loginError}</p>}
      <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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

export default LoginPage;
