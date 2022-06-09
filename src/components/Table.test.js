import { render, screen } from '@testing-library/react';
import Table from './Table';

const mockProjects = [
  {
    emp1: 143,
    emp2: 218,
    id: 12,
    days: 8,
  },
  {
    emp1: 218,
    emp2: 143,
    id: 10,
    days: 14,
  },
  {
    emp1: 100,
    emp2: 200,
    id: 5,
    days: 19,
  },
];

test('no pairs found', () => {
  render(<Table projects={[]} />);

  expect(
    screen.getByText(/No pairs were found. Try again with a different file\./i)
  ).toBeInTheDocument();
});

test('lists pairs', () => {
  render(<Table projects={mockProjects} />);

  mockProjects.forEach((p) => {
    Object.values(p).forEach((value) => {
      const atLeastOne = screen.getAllByText(value)[0];
      expect(atLeastOne).toBeInTheDocument();
    });
  });
});
