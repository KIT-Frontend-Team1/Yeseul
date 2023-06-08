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
