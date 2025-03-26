import type { BookData } from "@/types";
// 해당 함수는 비동기로 반환해주고 있기에 우선 Promise 객체에 제네릭으로 이전에 만들어 놓은 BookData 타입을 정의해줌
export default async function fetchBooks(q?: string): Promise<BookData[]> {
  let url = "https://onebite-books-server-main-two-flame.vercel.app/book";

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
