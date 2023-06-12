import { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "./pagination";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  /*
    페이지 당 게시물 수(limit)
    현재 페이지 번호(page)
    첫 게시물의 위치(offset)
  */
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <S.Layout>
      <header>
        <h1>게시물 목록</h1>
      </header>

      <label>
        페이지 당 표시할 게시물 수 : &nbsp;
        <select
          type="number"
          value={limit}
          onChange={({ target: { value } }) => setLimit(Number(value))}
        >
          <option type="10">10</option>
          <option type="12">12</option>
          <option type="20">20</option>
          <option type="50">50</option>
          <option type="100">100</option>
        </select>
      </label>

      <main>
        {posts.slice(offset, offset + limit).map(({ id, title, body }) => (
          <article key={id}>
            <h3>
              {id}, {title}
            </h3>
            <p>{body}</p>
          </article>
        ))}
      </main>

      <footer>
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </S.Layout>
  );
};

export default Posts;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const S = {
  Layout,
};
