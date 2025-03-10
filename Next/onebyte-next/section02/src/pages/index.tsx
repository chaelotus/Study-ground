import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";

// 이렇게 해주면 이 페이지는 ssr 방식으로 사전 렌더링이 이루어지게 된다.
export const getServerSideProps = async () => {
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRancomBooks();
  // 현재는 하나 받아오고 기다리고 하나 받아옴, 아래는 동시에 병렬로 받아오는 방법
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  // 컴포넌트보다 먼저 실행이 되어서, 컴포넌트에 필요한 데이터 불러오는 함수

  // 이 함수는 객체를 반환해야하는데, 이 떄 props라는 속성 포함하는 단 하나의 객체 반환해야 함
  return {
    props: {
      allBooks,
      recoBooks,
    },
  };
};
// InferGetServerSidePropsType : getServerSideProps 가 반환하는 객체값을 자동으로 추론해주는 타입
export default function Home({
  allBooks,
  recoBooks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // 해당 컴포넌트는 서버에서 한번 실행하고 브라우저에서 한 번 더 실행됨
  // 그래서 브라우저에서만 돌아가는 window.location 을 아무조건 없이 작성하면 오류 발생함
  // 그럼 브라우저에서만 실행하게 하려면?

  // 1. useEffect 사용하기

  console.log(allBooks);
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {recoBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

//Home컴포넌트에 getLayout이라는 메서드를 사용할것이다. 그런데 page컴포넌트를 page라는 이름인 매개변수로 받아서
// 이렇게 받은 매개변수를 SearchableLayout로 감싼 형태를 리턴하도록
// 그리고 이때 page 매개변수의 타입은 ReactComponent
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
// 이렇게 하면 Home컴포넌트에 저장된 getLayout이라는 메서드는 현재 페이지 역할을 할 page를 받아와서
// SearchableLayout이라는 별도의 레이아웃으로 감싸진 형태의 페이지를 (=레이아웃이 적용된 페이지)리턴해준다.
