import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

async function Footer() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) return <footer>제작 @winterlood</footer>;

  const books: BookData[] = await response.json();
  const bookCount = books.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCount}개의 도서가 등록되어있습니다.</div>
    </footer>
  );
}

// 현재 not-found 페이지 빼고 다 Dynamic page임.
// 1. 제일 먼저 루트 컴포넌트를 가장 먼저 확인해야함
// 동적함수라던가 캐싱되지 않는 데이터페칭이 존재하는지 살펴봐야함.
// Footer 컴포넌트에서 fetch 메서드를 사용하고 있음. 하지만 아무런 캐시 옵션 설정되어 있지 않음
// 그럼 이 fetch는 자동으로 no-store 옵션을 가지게 됨 (= 데이터 캐시하지 않게 됨)
// 데이터 캐시하지 않게되면 페이지 요청할 때마다 새롭게 데이터 계속 불러와야 함

// 이렇게 다 처리를 하고 build를 하면 .next/app/index.html 를 확인하면 index page가 빌드 타임에
// 미리 생성이 완료되어서 서버측에 캐싱이 잘된것을 확인할 수 있다.
// 이때 이러한 기능을 바로 풀라우트 캐시라 한다.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
