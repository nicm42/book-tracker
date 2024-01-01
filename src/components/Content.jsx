import { useState } from 'react';

function Content({ data, years }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [booksAcquired, setBooksAcquired] = useState(0);

  const calculateBooksAcquired = (year) => {
    const thisYearsData = data.filter((obj) => {
      return obj.sheet === year;
    });
    if (thisYearsData[0]) {
      const thisYearsAcquired = thisYearsData[0].data.filter((books, index) => {
        if (index !== 0) return books[0] !== '';
      });
      setBooksAcquired(thisYearsAcquired.length);
    }
  };

  const yearSelected = (year) => {
    setSelectedYear(year);
    calculateBooksAcquired(year);
  };

  return (
    <>
      <form>
        <label>
          Choose a year to see statistics for:
          <select
            value={selectedYear}
            onChange={(e) => yearSelected(e.target.value)}
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </form>
      {selectedYear !== '' && (
        <p>
          Total books acquired in {selectedYear} is: {booksAcquired}
        </p>
      )}
    </>
  );
}

export default Content;
