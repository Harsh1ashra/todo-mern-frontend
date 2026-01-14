// // frontend/src/__mocks__/axios.js

// import Task from "../../../backend/models/Task";

// // This is a manual Jest mock for axios
// const axios = {
//   get: jest.fn(() => Promise.resolve({ data: [] })),
//   post: jest.fn((data) => Promise.resolve({ data: Task})),
// };

// export default axios;



// frontend/src/__mocks__/axios.js

// Manual Jest mock for axios


// const axios = {
//   create: jest.fn(() => axios), // mock axios.create for tests
//   get: jest.fn(() => Promise.resolve({ data: [] })),
//   post: jest.fn((url, task) =>
//     Promise.resolve({
//       data: { _id: "1", title: task.title, status: task.status || "incomplete" },
//     })
//   ),
//   put: jest.fn((url, task) =>
//     Promise.resolve({
//       data: { _id: url.split("/").pop(), title: task.title, status: task.status },
//     })
//   ),
//   delete: jest.fn((url) =>
//     Promise.resolve({ data: { message: "Task deleted" } })
//   ),
// };

// export default axios;




// frontend/src/__mocks__/axios.js

// Manual Jest mock for axios
// const axios = {
//   create: jest.fn(() => axios), // allow axios.create() chaining
//   get: jest.fn(() => Promise.resolve({ data: [] })),
//   post: jest.fn((url, data) => Promise.resolve({ data })),
//   put: jest.fn((url, data) => Promise.resolve({ data })),
//   delete: jest.fn((url) => Promise.resolve({ data: { message: "Task deleted" } })),
// };

// export default axios;





// frontend/src/__mocks__/axios.js

// Manual Jest mock for axios
const axios = {
  create: jest.fn(() => axios), // mock axios.create to return the axios mock itself
  get: jest.fn(() => Promise.resolve({ data: [] })), // default empty task list
  post: jest.fn((url, data) => Promise.resolve({
    data: {
      _id: "1",
      title: data.title,
      status: data.status || "incomplete",
    },
  })),
  put: jest.fn((url, data) => Promise.resolve({
    data: {
      _id: url.split("/").pop(),
      title: data.title,
      status: data.status,
    },
  })),
  delete: jest.fn(() => Promise.resolve({ data: { message: "Task deleted" } })),
};

export default axios;
