import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/auth/user";
import { hashPassword } from "@/lib/auth/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (await findUserByEmail(email)) {
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser(name, email, passwordHash);

    return NextResponse.json({ id: user.id, name: user.name, email: user.email });
  } catch {
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });
  }
}
