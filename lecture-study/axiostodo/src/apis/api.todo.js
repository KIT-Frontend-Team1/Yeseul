import { useTodoStore } from "contexts/todo";
import { axiosInstance } from "utils/axios";

const Apis = (endpoint) => {
  const { setTodoList } = useTodoStore();

  const getApi = async () => {
    try {
      const res = await axiosInstance.get(endpoint);
      console.log(res.data.data);
      // return res.data.data;
      setTodoList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addApi = async (title, content) => {
    try {
      if (!title || !content) {
        const err = new Error();
        err.type = "empty content";
        err.message = "빈칸을 채워주세요";
        throw err;
      }

      await axiosInstance.post(endpoint, {
        title,
        content,
      });
      getApi();
    } catch (err) {
      console.error(err);
    }
  };

  const updateApi = async (id, content, state) => {
    try {
      await axiosInstance.put(`${endpoint}/${id}`, { content, state });
      getApi();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteApi = async (id) => {
    try {
      await axiosInstance.delete(`${endpoint}/${id}`);
      getApi();
    } catch (err) {
      console.error(err);
    }
  };

  const apis = {
    getApi,
    addApi,
    updateApi,
    deleteApi,
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
