import { render, screen } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('renders sites header', () => {
  const { container } = render(<App />);

  expect(screen.getByText(/Text Editor/i)).toBeInTheDocument();
});

test('renders create new document button', () => {
  const { container } = render(<App />);

  expect(screen.getByText(/Create new document/i)).toBeInTheDocument();
});

test('renders update document button', () => {
  const { container } = render(<App />);

  expect(screen.getByText("Choose/Update a document")).toBeInTheDocument();
});