import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      credits: number;
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    credits: number;
  }
}
