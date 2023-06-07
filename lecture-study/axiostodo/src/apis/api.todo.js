import { useTodoStore } from "contexts/todo";
import { axiosInstance } from "utils/axios";

const Apis = () => {
  const { setTodoList } = useTodoStore();

  const getTodoApi = async () => {
    try {
      const res = await axiosInstance.get("/todo");
      console.log(res.data.data);
      // return res.data.data;
      setTodoList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodoApi = async (title, content) => {
    try {
      if (!title || !content) {
        const err = new Error();
        err.type = "empty content";
        err.message = "빈칸을 채워주세요";
        throw err;
      }

      await axiosInstance.post("/todo", {
        title,
        content,
      });
      getTodoApi();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodoCheckApi = async (id, content, state) => {
    try {
      await axiosInstance.put(`/todo/${id}`, { content, state: !state });
      getTodoApi();
    } catch (err) {
      console.error(err);
    }
  };

  const updateTodoContentApi = async (id, content, state) => {
    try {
      await axiosInstance.put(`/todo/${id}`, { content, state });
      getTodoApi();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodoApi = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      getTodoApi();
    } catch (err) {
      console.error(err);
    }
  };

  const apis = {
    getTodoApi,
    addTodoApi,
    updateTodoCheckApi,
    updateTodoContentApi,
    deleteTodoApi,
  };

  return apis;
};

export default Apis;

// import { axiosInstance } from "utils/axios";

// export const getTodoApi = async (endpoint) => {
//   try {
//     const res = await axiosInstance.get(endpoint);
//     console.log(res);
//     console.log(res.data.data);
//     return res.data.data;
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const addTodoApi = async (endpoint, title, content) => {
//   try {
//     if (!title || !content) {
//       const err = new Error();
//       err.type = "empty content";
//       err.message = "빈칸을 채워주세요";
//       throw err;
//     }

//     await axiosInstance.post(endpoint, {
//       title,
//       content,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const updateTodoContentApi = async (endpoint, id, content) => {
//   try {
//     await axiosInstance.put(`${endpoint}/${id}`, { content });
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const updateTodoCheckApi = async (endpoint, id, state) => {
//   try {
//     await axiosInstance.put(`${endpoint}/${id}`, { state: !state });
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const deleteTodoApi = async (endpoint, id) => {
//   try {
//     await axiosInstance.delete(`${endpoint}/${id}`);
//   } catch (err) {
//     console.error(err);
//   }
// };
