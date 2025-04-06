## 3.4 리액트 서버컴포넌트 이해하기

### 서버 컴포넌트 이전의 이야기

> Page Router 버전의 Next.js의 문제점

사전렌더링에서 화면의 상호작용을 하기 위해, 즉 수화(Hydration)을 하기 위해 우리가 작성한 모든 컴포넌트들을 Js Bundle로 후속으로 전달해준다. JS Bundle에 포함되어서 브라우저에게 전달된 리액트 컴포넌트들은 결국 브라우저측에서 Hydration을 위해서 한번더 실행된다.

하지만 JS Bundle안에 모든 컴포넌트들이 다 포함이 될 필요는 없다.  
(상호작용이 필요없는 정적인 컴포넌트들도 포함되어있기 떄문에)

![alt text](image.png)
하지만 pageRouter는 어떠한 컴포넌트든 페이지에 포함만된다면 전부다 JS Bundle에 묶어서 그대로 전부다 브라우저에 전달을 하기 때문에 JS Bundle의 용량이 쓸데없이 커지게 된다.  
그로인해 Bundle을 불러오는 시간도 오래걸리고 Hydratioin을 진행하는 시간도 오래 걸리기 때문에 결국 `TTI`까지 오래 걸리게 된다.

> 그럼 이러한 문제를 해결하려면?

JS Bundle에 불필요한 서버 컴포넌트들을 포함시키지 않으면 된다.

### React Server Component

: 서버측에서만 딱 한번 실행되는 컴포넌트 (브라우저에서 실행 x)

- 서버 컴포넌트 : 서버측에서 사전렌더링 할 때 딱 한번만 실행됨
- 클라이언트 컴포넌트 : 사전렌더링 진행할 때 한번, 하이드레이션 진행할 때 한번, 총 두번 실행됨

Next 공식문서에서는 페이지 대부분을 `서버 컴포넌트`로 구성할 것을 권장하고 있다.  
클라이언트 컴포넌트는 꼴 필요한 경우에만 사용하길 권장함.

클라이언트 컴포넌트가 줄어들수록 Js Bundle의 사이즈가 줄어들 것이고 그렇게 되면 브라우저에 더 빠른 속도로 보여주기 때문이다.

서버컴포넌트는 우리가 직접 만들 필요는 없다. 왜냐하면 app router에서의 모든 컴포넌트는 기본적으로 server component로 구성되어있다.

> 그럼 클라이언트 컴포넌트로 만들기 위해서는 어떻게 해야할까?

페이지 상단에 `"use client";` 를 작성하면 해당 파일에 있는 컴포넌트들은 모두 다 클라이언트 컴포넌트가 된다.

### React Server Component 주의사항

1. `서버 컴포넌트`에는 브라우저에서 실행될 코드가 포함되면 안된다.
2. `클라이언트 컴포넌트`는 클라이언트에서만 실행되지 않는다.
3. `클라이언트 컴포넌트`에서 `서버 컴포넌트`를 import 할 수 없다.

- 이런상황이 오면 Next는 서버 컴포넌트를 클라이언트 컴포넌트로 자동으로 변경하게 됨
  하지만 반드시 클라이언트 컴포넌트에 자식 컴포넌트로 서버 컴포넌트가 와야할 상황이 온다면?

```tsx
"use client";

import ServerComponent from "./server-component";

export default function ClientComponent() {
  console.log("클라이언트 컴포넌트 ");
  return <ServerComponent />;
}
```

위의 코드와 같이 서버컴포넌트를 바로 import하여 사용하지 말고, `children Props`를 받아서 렌더링을 시켜주는 방법을 사용하면 된다.

```tsx
"use client";

export default function ClientComponent({ children }: { children: ReactNode }) {
  console.log("클라이언트 컴포넌트 ");
  return <div>{children} </div>;
}
```

```tsx
import ClientComponent from "./client-component";
import styles from "./page.module.css";
import ServerComponent from "./server-component";

export default function Home() {
  return (
    <div className={styles.page}>
      인덱스 페이지
      <ClientComponent>
        <ServerComponent />
      </ClientComponent>
    </div>
  );
}
```

이렇게 children을 이용한 방식을 사용하면 Next는 children으로 전달된 서버 컴포넌트는 클라이언트 컴포넌트로 변경하지 않는다.  
왜냐하면 clientcomponent는 이제 servercomponent를 직접 실행할 필요없이 오직 서버컴포넌트의 결과물만 children이란 props로 전달받아 보여줄 수 있도록 구조가 변경되었기 때문이다.

4. `서버 컴포넌트`에서 `클라이언트 컴포넌트`에게 직렬화 되지 않는 Props는 전달 불가하다.

- 직렬화 되지 않는 Props?  
  직렬화(Serialization)  
  : 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태(문자열, Byte)로 변환하는 것

```js
// Before

const person = {
  name: "박채연",
  age: 28,
};

// After
// {"name" : "박채연", "age":28}
```

JS 의 함수는 아주 특별하게 직렬화가 불가능하다.  
왜냐하면 JS의 함수는 어떤 값이 아닌 코드 블록들을 포함하고 있는 특수한 형태를 가지고 있기도 하고 클로저나 렉시컬 스코프와 같은 다양한 환경에 의존해있는 구조가 많기 때문에 이러한 모든 정보들을 다 단순한 문자열로 표현하기에는 어려움이 있다.

> 결론 : 서버컴포넌트에서 클라이언트 컴포넌트에게 함수와 같은 직렬화 할 수 없는 props값을 주면 안된다.
