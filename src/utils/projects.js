import { DAY } from './constants';

export const formatCSVContent = (csvContent) => {
  return csvContent
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

export const findCommonProjects = (list) => {
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
      // nextEntry.startDate|--------------|nextEntry.endDate
      if (
        startDate < nextEntry.endDate &&
        startDate > nextEntry.startDate &&
        endDate > nextEntry.endDate
      ) {
        time = nextEntry.endDate - startDate;
        // startDate|--------------|endDate
        // nextEntry.startDate|-------|nextEntry.endDate
      } else if (
        startDate < nextEntry.startDate &&
        nextEntry.endDate < endDate
      ) {
        time = nextEntry.endDate - nextEntry.startDate;
        // startDate|--------------|endDate
        // nextEntry.startDate|--------------|nextEntry.endDate
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
