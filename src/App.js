import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repositorio git teste ${Date.now()}`,
      url: 'http://repo.git.com',
      techs: ["node", "react"],
    })
    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repo => repo.id === id);
    if (repositoryIndex < 0) {
      return
    }
    const response = await api.delete("repositories/" + id);
    if (response.status !== 204) {
      return
    }
    const newRepositories = [...repositories];
    newRepositories.splice(repositoryIndex,1);
    setRepositories(newRepositories);

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
                </button>
            </li>
          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
