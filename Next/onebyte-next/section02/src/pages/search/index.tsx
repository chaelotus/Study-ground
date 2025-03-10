import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
} from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";

// export const getStaticProps = async (
//   context: GetStaticPropsContext
// ) => {
//   // context라는 매개변수에는 현재 브라우저에 받은 요청에 대한  모든 정보가 다 포함되잇다.

//   // context타입을 GetStaticPropsContext로 변경하면 query에 에러가 난다.
//   // (context에는 query가 존재하지 않는다는 에러)
//   // 이유는 getStaticProps가 실행될 때는 빌드타임에 딱 한번 실행되기 때문!!
//   // 빌드 타임에 query string을 알 수 없음
//   // 결론! 해당 search page는 아래와 같은 방식으로 구동하려면 ssg를 사용할 수 없다.
//   // 그럼에도 해야하면 우선 getStaticProps 함수 삭제 또는 주석처리, 컴포넌트 안에서 query string 불러올 수 있도록
// 페이지에서 getServerSideProps 또는 getStaticProps가 없다면 기본적으로 ssg방식으로 동작함

//   const q = context.query.q;
//   const books = await fetchBooks(q as string);
//   return {
//     props: { books },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      // 검색 결과 불러오는 로직
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
