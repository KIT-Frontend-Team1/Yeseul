import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

// function MainPage() {} // 이렇게 써도 됨~

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('todoId')); // http://localhost:3000/?todoId=3000 이렇게 이동해야함

  const navigate = useNavigate(); // useNavigate() : 데이터 새로 안받아오게 하는 거

  const onClickNavigationTodo = () => {
    // window.location.href = '/todo/3' // 이렇게 하면 클릭할 때마다 데이터 새로 받아와짐 (a태그 처럼)
    // navigate(-1) // 뒤로가기 ㅋ
    // navigate('/todo/3')
    setSearchParams({
      todoId: 3,
      page: 5
    })
  }

  return (
    <React.Fragment>
    {/* 주석
        태그명이 없는 태그를 Fragment라고 부른다.(<> 빈 태그나 <Fragment> <React.Fragment>로 쓴다~) / 만약 해당 Fragment에 속성을 줄 경우 <> 빈태그에선 사용할 수 없으므로 React.Fragment */}
      <div>main</div>
      <div>:)</div>
      <button onClick={onClickNavigationTodo}>TodoPage로 이동</button>
      <a href='/todo/3'>TODOPAGE</a> 
      <Link to='/todo/5'>TODOPAGE</Link> {/* React에서 이거 씀 CSR, 캐싱되어있는 것 가져오는 개념 */}
    </React.Fragment>
  )
}

export default MainPage