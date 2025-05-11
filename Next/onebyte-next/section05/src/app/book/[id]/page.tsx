import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

// 만약 generateStaticParams에서 return 한 데이터 제외한 값들은 not found 페이지를
// 보여주고 싶다면 아래와 같이 dynamicParams를 false로 내보내면 됨
// 그러면 next가 dynamicParams 값을 확인해서 지금 이 페이지 url parameter는
// dynamic 하면 안되겠구나라고 판단하여 1,2,3 제외한 데이터는 존재하면 안되겠구나라고 해석함
//export const dynamicParams = false;

// 해당 페이지를 정적페이지로 만들고 싶다면
// 어떤 url paramter들이 존재할 수 있는지 알려줘야 함
// 어떠한 도서 데이터들이 빌드타임에 만들어줘야하는지

// 정적인 parameter를 생성하는 함수
// 정적인 데이터 1,2,3을 빌드타임에 만들게 된다.
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
// 해당 함수를 쓸 때 주의할 점!
// 1. parameter data 명시할 때는 문자열로만 명시해야 함
// 2. 해당 함수 사용하면
// 페이지 컴포넌트 내부에 데이터 캐싱이 설정되지 않은 데이터 fetching이 존재하게 될지라도
// 무조건 해당하는 페이지가 static page로써 강제로 설정됨.

// page router에서도 위와 비슷한 함수가 있었다.
// getStaticpaths
// 정적으로 빌드타임에 어떠한 url parameter들이 존재할 수 있는지 설정하는 함수가 존재했다.
// :: 동일한 역할을 한다.

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  //console.log(id);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
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
  );
}
