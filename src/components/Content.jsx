import { useState } from 'react';

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
        <div>
          <p>
            Total books acquired in {selectedYear} is: {booksAcquired}
          </p>
          <p>
            Total books read in {selectedYear} is: {booksRead}
          </p>
          <p>
            Total books acquired in {selectedYear} but not read is:{' '}
            {booksAcquiredNotRead}
          </p>
          <p>
            Total books read in {selectedYear} acquired in a previous year is:{' '}
            {booksReadNotAcquired}
          </p>
        </div>
      )}
    </>
  );
}

export default Content;
