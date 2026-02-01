import { getBio } from "@/server/db/queries/bio";
import { NextResponse } from "next/server";

export async function GET() {
  const bio = await getBio();
  return NextResponse.json(bio);
}
