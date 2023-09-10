// src/app/api/test.ts

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);

      // Do something with the data in the body
      const result = { message: "Received data successfully", data: body };

      return res.status(200).json(result);
    } catch (error) {
      console.error("[TEST_POST]", error);
      return res.status(500).json({ error: "Internal error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
