import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { formatCSVContent, findCommonProjects } from './utils/projects';

const fileReader = new FileReader();

function App() {
  const [projects, setProjects] = useState([]);

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
      <table border={0} cellSpacing={0}>
        <thead>
          <tr>
            <th>Employee ID #1</th>
            <th>Employee ID #2</th>
            <th>Project ID</th>
            <th>Days Worked</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, i) => {
            const { emp1, emp2, id, days } = project;
            return (
              <tr key={uuidv4()}>
                <td>{emp1}</td>
                <td>{emp2}</td>
                <td>{id}</td>
                <td>{days}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

export default App;
