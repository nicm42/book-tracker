import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from './Content';
import DataContext from '../contexts/DataContext';

describe('Testing set up', () => {
  const data = [];
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
  });
});
