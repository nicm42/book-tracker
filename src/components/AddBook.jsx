import { useState } from 'react';

function AddBook({ data, years }) {
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [typeAdding, setTypeAdding] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [booksAcquired, setBooksAcquired] = useState([]);

  const calculateBooks = (year) => {
    const thisYearsData = data.filter((obj) => {
      return obj.sheet === year;
    });
    if (thisYearsData[0]) {
      let thisYearsAcquired = [];
      thisYearsData[0].data.forEach((books, index) => {
        if (index !== 0) {
          if (books[0]) {
            thisYearsAcquired.push(books[0]);
          }
        }
      });
      setBooksAcquired(thisYearsAcquired.sort());
    }
  };

  const setForm = (type) => {
    setIsFormShowing(true);
    setTypeAdding(type);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    calculateBooks(year);
  };

  return (
    <>
      <button onClick={() => setForm('acquired')}>Add book acquired</button>
      <button onClick={() => setForm('read')}>Add book read</button>
      {isFormShowing && (
        <form>
          <label>
            Choose a year to add a book to:
            <select
              required
              value={selectedYear}
              onChange={(e) => selectYear(e.target.value)}
            >
              <option value="">Select a year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          {typeAdding === 'read' && selectedYear !== '' && (
            <label>
              Select the book you've read:
              <select
                required
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
              >
                <option value="">Select a book</option>
                {booksAcquired.map((book) => (
                  <option key={book} value={book}>
                    {book}
                  </option>
                ))}
                <option value="none">- Not acquired this year -</option>
              </select>
            </label>
          )}
          {((typeAdding === 'acquired' && selectedYear !== '') ||
            (typeAdding === 'read' && selectedBook === 'none')) && (
            <div>
              <label htmlFor="book">Type in title and author</label>
              <input type="text" id="book" name="book" required />
            </div>
          )}
          {((typeAdding === 'acquired' && selectedYear !== '') ||
            (typeAdding === 'read' && selectedBook !== '')) && (
            <button type="submit">Submit book</button>
          )}
        </form>
      )}
    </>
  );
}

export default AddBook;
