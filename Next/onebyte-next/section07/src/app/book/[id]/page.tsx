import { BookData } from "@/types";
import style from "./page.module.css";

async function BookDetail({ bookId }: { bookId: string }) {
  //const {id} = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`
  );

  if (!response.ok) return <div>오류가 발생했습니다...</div>;

  const book: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
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
    </section>
  );
}

function ReviewEditor() {
  // use server 작섣함으로써 이 함수는 서버액션으로써 설정됨
  async function createReviewAction(formData: FormData) {
    "use server";
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();

    console.log(content, author);
  }

  return (
    <section>
      <form action={createReviewAction}>
        <input name="content" placeholder="리뷰 내용" />
        <input name="author" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

// test
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor />
    </div>
  );
}
