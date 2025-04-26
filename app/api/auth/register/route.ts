import { db } from "@/db";
import { User } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required!" },
      { status: 400 }
    );
  }

  const existingUser = await db
    .select()
    .from(User)
    .where(eq(User.email, email));

  if (existingUser.length > 0) {
    return NextResponse.json(
      { error: "User with this email already exists!" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const imageUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${name}`;

  const newUser = await db
    .insert(User)
    .values({
      name,
      email,
      imageUrl,
      password: hashedPassword,
    })
    .returning({
      id: User.id,
      name: User.name,
      email: User.email,
      imageUrl: User.imageUrl,
      credits: User.credits,
    });

  if (newUser.length === 0) {
    return NextResponse.json(
      { error: "Failed to create user!" },
      { status: 500 }
    );
  }

  const { id, name: userName, imageUrl: userImageUrl, credits } = newUser[0];
  return NextResponse.json(
    {
      id,
      name: userName,
      email,
      imageUrl: userImageUrl,
      credits,
    },
    { status: 201 }
  );
}
