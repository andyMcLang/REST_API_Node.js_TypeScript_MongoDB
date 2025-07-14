"use client";

import { useForm } from "react-hook-form";

function RegisterPage() {
  const {
    register,
    formState: { errors },
  } = useForm<{ email: string }>();

  return (
    <>
      <form>
        <div className="form-element">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="joku.nimi@esimerkki.com"
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>
        <button type="submit">VAHVISTA</button>
      </form>
    </>
  );
}

export default RegisterPage;
