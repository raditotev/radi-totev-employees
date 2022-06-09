import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('initial state', () => {
  render(<App />);
  const header = screen.getByRole('heading', {
    name: /find employees who worked on common projects/i,
  });
  const browseButton = screen.getByLabelText('Select file');
  const table = screen.queryByRole('table');

  expect(header).toBeInTheDocument();
  expect(browseButton).toBeInTheDocument();
  expect(table).not.toBeInTheDocument();
});

test('upload file', () => {
  const file = new File(['employees'], 'employees.csv', { type: 'text/csv' });

  render(<App />);

  const input = screen.getByLabelText(/select file/i);
  userEvent.upload(input, file);

  expect(input.files[0]).toStrictEqual(file);
  expect(input.files.item(0)).toStrictEqual(file);
  expect(input.files).toHaveLength(1);
});
