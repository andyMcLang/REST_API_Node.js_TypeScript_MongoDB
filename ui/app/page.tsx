"use client";

import type { NextPage } from "next";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home: NextPage = () => {
  const { data, error } = useSWR<User>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher
  );

  if (error) return <div>Virhe: {error.message}</div>;
  if (!data) return <div>Ladataan...</div>;

  return <div>Tervetuloa! {data.name}</div>;
};

export default Home;
