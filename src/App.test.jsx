import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  });

  test('Sending data should update stats', async () => {
    // Add book
    await userEvent.click(
      screen.getByRole('button', { name: 'Add book read' }),
    );
    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: /Choose a year to add a book to:/i,
      }),
      screen.getByTestId('add-2024'),
    );
    await userEvent.type(
      screen.getByLabelText('Type in title and author'),
      'Test book 3 by Anon',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit book' }));

    // Show stats for that year
    await userEvent.selectOptions(
      screen.getByRole('combobox', {
        name: /Choose a year to see statistics for:/i,
      }),
      screen.getByTestId('stats-2024'),
    );
    expect(
      screen.getByText('Total books acquired in 2024 is: 0'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Total books read in 2024 is: 1'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Total books acquired in 2024 but not read is: 0'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Total books read in 2024 acquired in a previous year is: 1',
      ),
    ).toBeInTheDocument();
  });
});
