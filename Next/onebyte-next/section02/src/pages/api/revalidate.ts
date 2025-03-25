import { NextApiRequest, NextApiResponse } from "next";

// On-Demand ISR
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // index 페이지를 요청받았을 때  revalidate(재생성) 시켜주도록 코드 작성
    // revalidate 인수에 어떤 페이지를 revalidate를 할 건지, 페이지 경로를 적어줌
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (err) {
    res.status(500).send("Revalidation Failed");
  }
}
