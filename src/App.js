import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { DAY } from './utils/constants';

const formatCSVOutput = (csvOutput) => {
  return csvOutput
    .split(/\r\n/)
    .slice(1)
    .map((el) => {
      const [uid, pid, startDate, endDate] = el.split(',');
      return {
        uid: Number(uid),
        pid: Number(pid),
        startDate: new Date(startDate),
        endDate: endDate === 'NULL' ? new Date() : new Date(endDate),
      };
    });
};

const findCommonProjects = (list) => {
  const projects = [];

  list.forEach((entry, index) => {
    const { uid, pid, startDate, endDate } = entry;

    for (let step = index + 1; step < list.length; step++) {
      const nextEntry = list[step];
      let time = 0;

      if (nextEntry.uid === uid || nextEntry.pid !== pid) {
        continue;
      }

      // startDate|--------------|endDate
      // e.startDate|--------------|e.endDate
      if (
        startDate < nextEntry.endDate &&
        startDate > nextEntry.startDate &&
        endDate > nextEntry.endDate
      ) {
        time = nextEntry.endDate - startDate;
        // startDate|--------------|endDate
        // e.startDate|-------|e.endDate
      } else if (
        startDate < nextEntry.startDate &&
        nextEntry.endDate < endDate
      ) {
        time = nextEntry.endDate - nextEntry.startDate;
        // startDate|--------------|endDate
        // e.startDate|--------------|e.endDate
      } else if (
        startDate < nextEntry.startDate &&
        endDate < nextEntry.endDate
      ) {
        time = endDate - nextEntry.startDate;
      } else {
        continue;
      }

      const project = {
        emp1: uid,
        emp2: nextEntry.uid,
        id: pid,
        days: time / DAY,
      };

      const existingProject = projects.find(
        (p) => p.emp1 === project.emp1 && p.emp2 === project.emp2
      );

      if (existingProject) {
        if (existingProject.days < project.days) {
          projects[projects.indexOf(existingProject)] = project;
        }
        continue;
      }

      projects.push(project);
    }
  });

  return projects;
};

const fileReader = new FileReader();

function App() {
  const [projects, setProjects] = useState([]);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        const usersProjectsList = formatCSVOutput(csvOutput);
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
      <table>
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
