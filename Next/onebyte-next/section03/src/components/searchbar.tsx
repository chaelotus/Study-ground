"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// app router 버전의 useRouter는 next/navigation에서 불러와야 함.

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };
  return (
    <div>
      <input value={search} onChange={onChangeSearch} type="text" />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}

// app router에서는 파일 이름이 page나 layout이 아니면 일반적인 js나 ts파일로 간주하기 때문에
// 컴포넌트를 위한 파일도 app 폴더 안에 만들어도 된다.
// 이러한 특징을 Co-Location 이라 부른다.
