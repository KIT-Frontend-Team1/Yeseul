import { createBrowserRouter } from 'react-router-dom'
import MainPage from '../pages/main'
import TodoPage from '../pages/todo'
import Layout from '../components/Layout'

// export는 import 받을 때 {} - 구조분해할당 요놈으로 받아야함(export는 여러개가 있을 수 있으니까 키값으로 찾아야하므로), 여러 개가 있을 수 있으므로, 
// export const router = createBrowserRouter([]) // 이놈은 무조건 배열이다!
const router = createBrowserRouter([

  {
    // path: '/', // path는 안써줘도 작동함
    element: <Layout />,
    children: [
      {
        path: "/", // 메인페이지
        element: <MainPage />
      },
      {
        path: '/todo/:todoId',
        element: <TodoPage />
      },
    ]
  },
])

/* default -> 기본값 , default는 1개밖에 수출할 수 없음 이미 찾아져 있기 때문에 import할 때 그냥 변수명으로 함 */
export default router