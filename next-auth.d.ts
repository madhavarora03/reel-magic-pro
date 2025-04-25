import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      isSubscribed: boolean;
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    isSubscribed: boolean;
  }
}
