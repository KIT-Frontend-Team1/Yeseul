## recoil이란?

- Flux 아키텍처를 구현하기 위한 복잡하고 번거로운 코드를 recoil에서 react hook 기능을 사용하여 더 간편하고 직관적인 상태 관리를 하기 위해 도입된 라이브러리. 상태의 종속성 관계를 자동으로 추적하고 캐싱하여 상태 변경이 발생할 때 효율적인 업데이트를 수행할 수 있어 전역 상태 관리를 위한 간편한 라이브러리로 사용된다.

### recoil을 왜 사용하는지(장점)

1. 비동기 처리
   : redux 라이브러리는 비동기 처리를 해야하는 경우 redux thunk, redux saga 등에 의존하여 처리를 해왔다던지 또는 reduxtoolkit의 createAsyncThunk를 사용해왔으나, recoil은 비동기 처리를 기반으로 작성되어 있어, 동시성 모드를 지원한다.

: useRecoilState, useRecoilValue 등의 API를 사용하여 비동기 데이터를 상태로 관리하면서도 데이터 흐름 제어에 용이하다.
(useRecoilValue를 사용하면 try catch 구문을 사용하지 않아도 된다)

: async/await 문법의 사용이 가능하다
(cf, redux-saga에서는 generate로 비동기 처리 코드를 작성해야함)

2. 동시성 모드 지원
   : 동시성 모드란 React 앱이 빠른 반응속도를 유지하도록 하고 사용자의 장치 기능 및 네트워크 속도에 적절하게 맞추도록 돕는 새로운 기능들의 집합체를 뜻하는데 이를 지원하여 애플리케이션의 성능을 최적화할 수 있다.
   (비동기 selector를 만들고 suspense로 감싸면 동시성 모드를 쉽게 구현 가능하다.)

3. 유연한 상태 관리
   : recoil은 복잡한 상태 관리를 위해 다양한 패턴을 지원하는데 atom, selector, atomFamily, selectorFamily API를 통해 상태 관리 로직을 더욱 유연하게 구성할 수 있다.

### recoil의 단점?

## recoil의 상태

### 1. atom()

: Recoil의 상태를 표현. _**`쓰기 가능`**_ 한 RecoilState 객체를 반환

```javascript
function atom<T>({
  key: string,
  default: T | Promise<T> | RecoilValue<T>,

  effects_UNSTABLE?: $ReadOnlyArray<AtomEffect<T>>,

  dangerouslyAllowMutability?: boolean,
}): RecoilState<T>
```

- `key` : 내부적으로 atom을 식별하는데 사용되는 고유한 문자열. 애플리케이션 전체에서 고유해야한다
- `default` : atom의 초깃값 또는 Promise 또는 동일한 타입의 값을 나타내는 다른 atom이나 selector

#### ➡️ atom과 상호작용하기 위해 가장 자주 사용되는 Hooks

- useRecoilState() : atom 읽기, 쓰기 / atom에 컴포넌트를 등록하도록 함
- useRecoilValue() : atom 읽기 / atom에 컴포넌트를 등록하도록 함
- useSetRecoilState() : atom 쓰기
- useResetRecoilState() : atom을 초깃값으로 초기화할 때

### 2. selector()

: Recoil에서 함수나 파생된 상태. 주어진 종속성 값 집합에 대해 항상 동일값을 반환하는 부작용 없는 순수함수

```javascript
function selector<T>({
  key: string,

  get: ({
    get: GetRecoilValue
  }) => T | Promise<T> | RecoilValue<T>,

  set?: (
    {
      get: GetRecoilValue,
      set: SetRecoilState,
      reset: ResetRecoilState,
    },
    newValue: T | DefaultValue,
  ) => void,

  dangerouslyAllowMutability?: boolean,
})
```

- `key` : 내부적으로 atom을 식별하는데 사용되는 고유한 문자열. 애플리케이션 전체에서 고유해야한다
- `get` : 파생된 상태의 값을 평가하는 함수. 다른 atom이나 selector로부터 값을 찾는데 사용되는 함수. 값을 직접 반환하거나 비동기적인 Promise나 또는 같은 유형을 나타내는 다른 atom이나 selector를 반환할 수 있다. 첫 번째 매개변수로 다음 속성을 포함하는 객체를 전달

.. 비동기 selector 예시

: Selector는 또한 비동기 평가 함수를 가지고 있으며 Promise를 출력값으로 반환할 수 있다.

```javascript
const myQuery = selector({
  key: "MyQuery",
  get: async ({ get }) => {
    return await myAsyncQuery(get(queryParamState));
  },
});
```

참고 링크: recoil 공식 문서
https://recoiljs.org/ko/docs/api-reference/core/atom
