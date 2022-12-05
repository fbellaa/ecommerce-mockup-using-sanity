import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import { client } from "../../lib/client";

export default async function createReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productId, name, review, score } = req.body;
  try {
    await client.create({
      _type: "review",
      productId,
      name,
      review,
      score,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Couldn't submit review`, error });
  }

  return res.status(200).json({ message: "Review Submitted" });
}
