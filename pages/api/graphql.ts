// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const headers = {
  "content-type": "application/json",
  "authorization": `Bearer ${process.env.GRAPH_PERMANENTAUTH_TOKEN}`,
};

interface queryBody {
  query: string
}

const getOptions = (query: queryBody) => ({
  method: "POST",
  headers,
  body: JSON.stringify(query),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = await fetch(
    process.env.GRAPH_URL,
    getOptions(req.body),
  ).then(response => response.json());
  res.status(200).json(data); // Send the response
}
