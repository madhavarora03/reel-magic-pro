import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isSubscribed: boolean;
      id: number;
    } & DefaultSession["user"];
  }

  interface User {
    isSubscribed: boolean;
  }
}
