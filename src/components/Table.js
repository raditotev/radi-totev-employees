import { v4 as uuidv4 } from 'uuid';

const Table = ({ projects }) => (
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
);

export default Table;
