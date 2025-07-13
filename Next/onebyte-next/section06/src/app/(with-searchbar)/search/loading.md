```tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

주의사항

1. loading.tsx는 같은 경로의 페이지 컴포넌트만 스트리밍 해주는 것이 아니라
   마치 layout파일 처럼 해당하는 경로 아래에 있는 모든 파일들을 스트리밍되도록 설정이 됨.

2. loading.tsx 파일이 스트리밍하도록 설정하는 페이지 컴포넌트는 모든 페이지 컴포넌트가 아니고
   `async`라는 키워드가 붙어서 비동기로 작동하도록 설정한 페이지만 스트리밍이 적용된다.

3. loading.tsx 파일은 무조건 `페이지 컴포넌트에만 스트리밍을 설정할 수 있다.`
   그렇기 때문에 layout이나 components 안에 있는 일반적인 component에는 스트리밍을 설정할 수 없다.

그래서 만약 `일반적인 컴포넌트` 등에 스트리밍을 설정하고 싶다면 loading.tsx를 이용하면 안되고
`react의 suspense`라는 것을 이용해야 함.

4. loading.tsx 파일로 설정된 스트리밍은 브라우저에서 `쿼리스트링이 변경될때에는 트리거링되지 않는다.`
   쿼리스트리밍 값만 변경될 경우 스트리밍 적용되지 않음.
