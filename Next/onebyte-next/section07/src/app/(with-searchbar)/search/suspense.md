## Suspense

```tsx
return (
  <Suspense>
    <SearchResult q={searchParams.q || ""} />
  </Suspense>
);
```

미완성이라는 뜻을 갖고 있는 `Suspense` 컴포넌트로 비동기 컴포넌트 감싸주면 해당 컴포넌트를 스트리밍 하도록 설정해서 로딩 상태로 남겨놓게 된다.

이때 로딩상태를 표시하는 대체 UI는 Suspense의 fallback이라는 props로 넘겨주게 된다.  
참고로 컴포넌트로 넘겨줘도 됨.

```tsx
return (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchResult q={searchParams.q || ""} />
  </Suspense>
);
```

스트르밍이랑 동일하게 브라우저에서 쿼리스트링만 변경되었을 경우에는 로딩이 보이지 않는다.  
Suspense 컴포넌트에서 key라는 props를 전달해서 key값이 변경될 때마다 다시 로딩상태로 돌아가게 설정하는 것.
