import { createContext, useState, useEffect } from "react";
import axios from "axios";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

export const tasksContext = createContext();

export default function TasksProvider(props) {
  const [userTasks, setUserTasks] = useState([]);

  // Retrieve all tasks
  useEffect(() => {
    axios
      .get("/api/tasks")
      .then((response) => {
        const allTasks = response.data.tasks;
        setUserTasks(allTasks);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  const taskData = { userTasks, setUserTasks };

  return (
    <tasksContext.Provider value={taskData}>
      {props.children}
    </tasksContext.Provider>
  );
}
