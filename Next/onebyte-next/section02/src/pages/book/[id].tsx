import { useRouter } from "next/router";
import style from "./[id].module.css";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import Head from "next/head";

// 동적 경로를 갖는 페이지에 SSG로 동작되게 수정하니 getStaticPaths 함수가 필요하다는 에러가 남.
export const getStaticPaths = () => {
  return {
    // 여기서 참고로 url 파라미터 값은 반드시 문자열로 명시해줘야 함.
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    // 대체, 대비책, 보험 정도로 생각하면 되는 옵션인데
    // 만약 paths값에 없는 경로를 브라우저가 요청하면 그때는 어떻게 할건지 정하는 옵션
    // 3가지 옵션이 있음
    // 1. false : 묻지도  따지지도 않고 존재하지 않는 페이지에 대해서는 404 not found page를 보여줌
    // 2. blocking : SSR처럼 해당 경로를 서버 측에서 실시간으로 사전 렌더링하여 제공하는 방식
    // 3. true : fallback 상태(props가 없는 상태의 페이지)를 우선적으로 반환하여,
    // 사용자에게 즉시 기본적인 레이아웃을 보여주고, 백그라운드에서 필요한 데이터를 받아와 화면을 업데이트
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    // book이 존재하지 않는다면 잘못불러왓음(오류)
    return {
      notFound: true,
      // 404 not found 페이지로 리다이렉터 시켜줌
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // fallback상태 : 페이지 컴포넌트가  서버로부터 아직 데이터를 전달받지 못한 상태
  // 그럼 fallback상태일 때 로딩중이라고 보여주면 더 좋을것 같다.
  // 여기서 정말 존재하지 않는 book/100을 입력하면 로딩중 -> 문제가 발생하였습니다 라고 뜨는데
  // 하지만 로딩중 -> not found 페이지로 보내고 싶다면
  // 위의 getStaticProps 함수 안엥서 if(!book) 처리 해주면 됨.
  const router = useRouter();

  if (router.isFallback) {
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
        <div>로딩중입니다.</div>
      </>
    );
  }
  if (!book) return "문제가 발생하였습니다. 다시 시도해주세요.";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
