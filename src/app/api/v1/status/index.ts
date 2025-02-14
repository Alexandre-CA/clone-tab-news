import type { NextApiRequest, NextApiResponse } from 'next'
import database from "@/infra/database";

export default async function status(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log(result.rows);
  res.status(200).json({ message: 'Status' })
}