// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).end();
  }

  try {
    const movies = await prismadb.movie.findMany();
    return res.status(200).json(movies);
  } catch (err) {
    res.status(200).json(err);
  }
}
