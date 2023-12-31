import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('Testing set up', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('heading and select should be on the page', async () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Book Tracker');
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Choose a year to see statistics for:'),
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
    // TODO this only finds one option
    //await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(4));
    //expect(screen.getAllByRole('option')).toHaveLength(4)
  });
});
