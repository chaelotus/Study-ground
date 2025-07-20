"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

// reset : 에러가 나면 다시 한번 컴포넌트들을 렌더링 시켜보는 함수
// reset은 브라우저 측에서 서버로 받은 데이터를 다시 렌더링 해보려는 함수
// => 서버측에서 실행하는 서버 컴포넌트를 다시 실행하지는 않는다는 것.
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴
            reset(); // 에러 상태 초기화하고 컴포넌트들 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
/*
다시시도 버튼 클릭해도 화면에 렌더링 되지 않는 이유는
refresh가 비동기적 함수임. 그래서 refresh가 끝나기 전에 reset함수가 실행되서 
새로운 서버 컴포넌트 결과없이 화면에 렌더링됨.
async, await 을 붙여도 해결이 되지 않는 이유는 refresh가 비동기 함수라 Promise를 반환하지 않음

=> React 18버전부터 나온 startTransition() 메서드를 사용
하나의 콜백함수를 인수로 전달받아서 콜백함수 안에 들어있는 UI를 변경시키는 작업들을 모두 일괄적으로 동시에 처리해주게 됨.
*/
