import { useState } from 'react';

import { formatCSVContent, findCommonProjects } from './utils/projects';
import Table from './components/Table';

const fileReader = new FileReader();

function App() {
  const [projects, setProjects] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileReader.onload = function (event) {
        const csvContent = event.target.result;
        const usersProjectsList = formatCSVContent(csvContent);
        setProjects(findCommonProjects(usersProjectsList));
      };

      fileReader.readAsText(file);
    }
  };
  return (
    <main>
      <h1>Find employees who worked on common projects</h1>
      <form>
        <input type="file" accept=".csv" onChange={changeHandler} />
      </form>
      <Table projects={projects} />
    </main>
  );
}

export default App;
