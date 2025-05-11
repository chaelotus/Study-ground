import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams; // ③

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );
  // 브라어저에서 접속 요청 받았을 때 페이지는 계속 생성이 되겟지만
  // 검색결과는 계속 캐싱이 이루어지기 때문에 한 번 검색이 된 결과에 대해서는 조금 더 빠르게 페이지를 응답해줄 수 있게 됨

  // search page는 index page와 다르게 쿼리 스트링 같은 동적인 값에 의존하고 있기 때문에 어쩔 수 없이 static page로 설정할 수 없기 때문에
  // 대신에 데이터 캐시를 최대한 활용하는 쪽으로 최적화를 할 수 있다.
  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
