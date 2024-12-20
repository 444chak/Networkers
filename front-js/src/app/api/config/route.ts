// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   res.status(200).json({
//     commonKey: process.env.COMMON_KEY
//   });
// }

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    commonKey: process.env.COMMON_KEY,
  });
}
