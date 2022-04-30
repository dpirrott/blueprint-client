import { createContext, useState, useEffect } from "react";
import axios from "axios";
// require("dotenv").config();

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

export const projectsContext = createContext();

export default function ProjectsProvider(props) {
  const [userProjects, setUserProjects] = useState([]);

  // Retrieve all projects
  useEffect(() => {
    axios
      .get("/api/projects")
      .then((response) => {
        const allProjects = response.data.projects;
        setUserProjects(allProjects);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  const projectData = { userProjects, setUserProjects };

  return (
    <projectsContext.Provider value={projectData}>
      {props.children}
    </projectsContext.Provider>
  );
}
