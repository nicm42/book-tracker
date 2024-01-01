import { useState } from 'react';

function Content({ data, years }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [booksAcquired, setBooksAcquired] = useState(0);
  const [booksRead, setBooksRead] = useState(0);
  const [booksAcquiredNotRead, setBooksAcquiredNotRead] = useState(0);

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

  const calculateBooksRead = (year) => {
    const thisYearsData = data.filter((obj) => {
      return obj.sheet === year;
    });
    if (thisYearsData[0]) {
      const thisYearsRead = thisYearsData[0].data.filter((books, index) => {
        if (index !== 0) return books[1] !== '';
      });
      setBooksRead(thisYearsRead.length);
    }
  };

  const calculateBooksAcquiredNotRead = (year) => {
    const thisYearsData = data.filter((obj) => {
      return obj.sheet === year;
    });
    if (thisYearsData[0]) {
      let thisYearsAcquired = [];
      let thisYearsRead = [];
      thisYearsData[0].data.forEach((books, index) => {
        if (index !== 0) {
          if (books[0] !== '') {
            thisYearsAcquired.push(books[0]);
          }
          if (books[1] !== '') {
            thisYearsRead.push(books[1]);
          }
        }
      });
      const thisYearsAcquiredNotRead = thisYearsAcquired.filter((book) => {
        if (thisYearsRead.includes(book)) return book;
      });
      setBooksAcquiredNotRead(
        thisYearsAcquired.length - thisYearsAcquiredNotRead.length,
      );
    }
  };

  const yearSelected = (year) => {
    setSelectedYear(year);
    calculateBooksAcquired(year);
    calculateBooksRead(year);
    calculateBooksAcquiredNotRead(year);
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
        </div>
      )}
    </>
  );
}

export default Content;
