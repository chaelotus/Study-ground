import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

// getStaticProps : SSG 방식으로 동작함
// ssr과 동일하게 내부 구조가 같다
export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    // revalidate의 속성값으로는 몇초 주기로 페이지를 다시 생성할건지(=페이지의 유통기한)를 초 단위로 적어주기
    // * revalidate : 재검증하다.
    //revalidate: 3,
  };
};
// InferGetServerSidePropsType ->  InferGetStaticPropsType
// getServerSideProps -> getStaticProps
export default function Home({
  allBooks,
  recoBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요. "
        />
      </Head>
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
    </>
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
