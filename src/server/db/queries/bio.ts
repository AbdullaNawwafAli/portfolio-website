import { db } from "../drizzle";

export async function getBio() {
  const bio = await db.query.bioTable.findFirst();
  return bio;
}
