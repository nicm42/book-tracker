import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataContext from '../contexts/DataContext';
import Content from './Content';
import dummyData from '../../dummyData.json';

describe('Testing set up', () => {
  const data = dummyData;
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
      screen.getByText('Total books read in 2022 is: 5'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Total books acquired in 2022 but not read is: 3'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'Total books read in 2022 acquired in a previous year is: 4',
      ),
    ).toBeInTheDocument();
  });
});
