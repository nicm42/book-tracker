import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataContext from '../contexts/DataContext';
import Content from './Content';

describe('Testing set up', () => {
  const data = [
    {
      sheet: '2022',
      data: [
        ['Books acquired', 'Books read'],
        [
          'Birds of Passage by Robert Mammone',
          'The Autobiography of Mr. Spock by Una McCormack',
        ],
        [
          'Child of the New World by Andy Frankham-Allen',
          'A Guernsey Girl at the Chalet School by Amy Fletcher',
        ],
        [
          'Coming Up for Air by Tom Daley',
          'Eleanor Oliphant is Completely Fine by Gail Honeyman',
        ],
        ['A Class Act by Rob Beckett', 'Birds of Passage by Robert Mammone'],
        ['', "Let's Talk About Love by Claire Kann"],
        ['', 'Still Just a Geek by Wil Wheaton'],
      ],
    },
  ];
  const years = [2022, 2023, 2024];

  beforeEach(() => {
    render(
      <DataContext.Provider value={{ data, years }}>
        <Content data={data} years={years} />
      </DataContext.Provider>,
    );
  });

  test('select should include label and correct years', async () => {
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Choose a year to see statistics for:'),
    ).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(4));
    expect(
      screen.getByRole('option', { name: 'Select a year' }).selected,
    ).toBeTruthy();
  });

  test('information about a specific year should be correct', async () => {
    await userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '2022' }),
    );
    expect(screen.getByRole('option', { name: '2022' }).selected).toBeTruthy();
    expect(screen.getByRole('option', { name: '2023' }).selected).toBeFalsy();
    expect(
      screen.getByText('Total books acquired in 2022 is: 4'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Total books read in 2022 is: 6'),
    ).toBeInTheDocument();
  });
});
