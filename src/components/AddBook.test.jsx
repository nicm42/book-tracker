import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataContext from '../contexts/DataContext';
import AddBook from './AddBook';
import dummyData from '../../dummyData.json';

describe('Testing add book acquired', () => {
  const data = dummyData;
  const years = [2022, 2023, 2024];

  beforeEach(() => {
    render(
      <DataContext.Provider value={{ data, years }}>
        <AddBook data={data} years={years} />
      </DataContext.Provider>,
    );
  });

  test('should start by only showing two buttons', () => {
    expect(
      screen.getByRole('button', { name: 'Add book acquired' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add book read' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Submit book' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Book submitted')).not.toBeInTheDocument();
  });

  test('should show relevant elements if acquired button pressed', async () => {
    // Press acquired book
    await userEvent.click(
      screen.getByRole('button', { name: 'Add book acquired' }),
    );
    expect(
      screen.getByLabelText('Choose a year to add a book to:'),
    ).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(4));
    expect(
      screen.getByRole('option', { name: 'Select a year' }).selected,
    ).toBeTruthy();
    expect(
      screen.queryByRole('button', { name: 'Submit book' }),
    ).not.toBeInTheDocument();

    // Choose a year
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '2022' }),
    );
    expect(screen.getByRole('option', { name: '2022' }).selected).toBeTruthy();
    expect(
      screen.getByLabelText('Type in title and author'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Submit book' }),
    ).toBeInTheDocument();

    // Type in a book and press submit
    await userEvent.type(
      screen.getByLabelText('Type in title and author'),
      'Test book by Anon',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Submit book' }));
    expect(
      screen.queryByLabelText('Choose a year to add a book to:'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('Type in title and author'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Submit book' }),
    ).not.toBeInTheDocument();
    expect(screen.getByText('Book submitted')).toBeInTheDocument();
  });

  test('should show relevant elements if read button pressed', async () => {
    // Press acquired book
    await userEvent.click(
      screen.getByRole('button', { name: 'Add book read' }),
    );
    expect(
      screen.getByLabelText('Choose a year to add a book to:'),
    ).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(4));
    expect(
      screen.getByRole('option', { name: 'Select a year' }).selected,
    ).toBeTruthy();
    expect(
      screen.queryByRole('button', { name: 'Submit book' }),
    ).not.toBeInTheDocument();

    // Choose a year
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '2022' }),
    );
    expect(screen.getByRole('option', { name: '2022' }).selected).toBeTruthy();
    expect(
      screen.queryByLabelText('Type in title and author'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Submit book' }),
    ).not.toBeInTheDocument();

    // Choose a book from the list
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: /Select the book you've read:/i }),
      screen.getByRole('option', { name: 'A Class Act by Rob Beckett' }),
    );
    expect(
      screen.queryByLabelText('Type in title and author'),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Submit book' }),
    ).toBeInTheDocument();

    // Choose not acquired this year from the dropdown
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: /Select the book you've read:/i }),
      screen.getByRole('option', { name: '- Not acquired this year -' }),
    );
    expect(
      screen.getByLabelText('Type in title and author'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Submit book' }),
    ).toBeInTheDocument();
  });
});
