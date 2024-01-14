import { useState } from 'react';
import './Content.scss';

function Content({ data, years }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [booksAcquired, setBooksAcquired] = useState(0);
  const [booksRead, setBooksRead] = useState(0);
  const [booksAcquiredNotRead, setBooksAcquiredNotRead] = useState(0);
  const [booksReadNotAcquired, setBooksReadNotAcquired] = useState(0);

  const calculateBooksAcquiredNotRead = (thisYearsAcquired, thisYearsRead) => {
    const thisYearsAcquiredNotRead = thisYearsAcquired.filter((book) => {
      if (thisYearsRead.includes(book)) return book;
    });
    setBooksAcquiredNotRead(
      thisYearsAcquired.length - thisYearsAcquiredNotRead.length,
    );
  };

  const calculateBooksReadNotAcquired = (thisYearsAcquired, thisYearsRead) => {
    const thisYearsReadNotAcquired = thisYearsRead.filter((book) => {
      if (thisYearsAcquired.includes(book)) return book;
    });
    setBooksReadNotAcquired(
      thisYearsRead.length - thisYearsReadNotAcquired.length,
    );
  };

  const calculateBooks = (year) => {
    const thisYearsData = data.filter((obj) => {
      return obj.sheet === year;
    });
    if (thisYearsData[0]) {
      let thisYearsAcquired = [];
      let thisYearsRead = [];
      thisYearsData[0].data.forEach((books, index) => {
        if (index !== 0) {
          if (books[0]) {
            thisYearsAcquired.push(books[0]);
          }
          if (books[1]) {
            thisYearsRead.push(books[1]);
          }
        }
      });
      setBooksAcquired(thisYearsAcquired.length);
      setBooksRead(thisYearsRead.length);
      calculateBooksAcquiredNotRead(thisYearsAcquired, thisYearsRead);
      calculateBooksReadNotAcquired(thisYearsAcquired, thisYearsRead);
    }
  };

  const yearSelected = (year) => {
    setSelectedYear(year);
    calculateBooks(year);
  };

  return (
    <>
      <form className="year-select">
        <label htmlFor="select-year">
          Choose a year to see statistics for:
        </label>
        <select
          id="select-year"
          value={selectedYear}
          onChange={(e) => yearSelected(e.target.value)}
        >
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year} data-testid={`stats-${year}`}>
              {year}
            </option>
          ))}
        </select>
      </form>
      {selectedYear !== '' && (
        <div className="stats">
          <p>
            Total books acquired in {selectedYear} is:{' '}
            <span className="font-bold">{booksAcquired}</span>
          </p>
          <p>
            Total books read in {selectedYear} is:{' '}
            <span className="font-bold">{booksRead}</span>
          </p>
          <p>
            Total books acquired in {selectedYear} but not read is:{' '}
            <span className="font-bold">{booksAcquiredNotRead}</span>
          </p>
          <p>
            Total books read in {selectedYear} acquired in a previous year is:{' '}
            <span className="font-bold">{booksReadNotAcquired}</span>
          </p>
        </div>
      )}
    </>
  );
}

export default Content;
