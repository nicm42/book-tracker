import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddBook from './AddBook';

describe('Testing add book acquired', () => {
  beforeEach(() => {
    render(<AddBook type="acquired" />);
  });

  test('should have relevant text', async () => {
    expect(screen.getByLabelText('Add book acquired')).toBeInTheDocument();
    screen.getByRole('textbox');
    screen.getByRole('button', { name: /Add book/i });
  });
});

describe('Testing add book read', () => {
  beforeEach(() => {
    render(<AddBook type="read" />);
  });

  test('should have relevant text', async () => {
    expect(screen.getByLabelText('Add book read')).toBeInTheDocument();
    screen.getByRole('textbox');
    screen.getByRole('button', { name: /Add book/i });
  });
});
