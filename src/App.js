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
        <div>
          <label htmlFor="file">Select file</label>
          <input id="file" type="file" accept=".csv" onChange={changeHandler} />
        </div>
      </form>
      <Table projects={projects} />
    </main>
  );
}

export default App;
