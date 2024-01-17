import { useState } from 'react';
import './AddBook.scss';

function AddBook({ data, years, setData }) {
  const [isFormShowing, setIsFormShowing] = useState(false);
  const [typeAdding, setTypeAdding] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  const [booksAcquired, setBooksAcquired] = useState([]);
  const [bookToAdd, setBookToAdd] = useState('');
  const [booksAdded, setBooksAdded] = useState(false);

  let showAcquiredDropdown = false;
  if (
    typeAdding === 'read' &&
    selectedYear !== '' &&
    booksAcquired.length > 0
  ) {
    showAcquiredDropdown = true;
  }

  let showBookInput = false;
  if (
    (typeAdding === 'acquired' && selectedYear !== '') ||
    (typeAdding === 'read' &&
      (selectedBook === 'none' || (selectedYear && booksAcquired.length === 0)))
  ) {
    showBookInput = true;
  }

  let showSubmitButton = false;
  if (
    (typeAdding === 'acquired' && selectedYear !== '') ||
    (typeAdding === 'read' &&
      (selectedBook !== '' || (selectedYear && booksAcquired.length === 0)))
  ) {
    showSubmitButton = true;
  }

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
    setBooksAdded(false);
  };

  const selectYear = (year) => {
    setSelectedYear(year);
    calculateBooks(year);
  };

  const selectBook = (book) => {
    setSelectedBook(book);
    if (book !== 'none') {
      setBookToAdd(book);
    }
  };

  const postBook = async (event) => {
    event.preventDefault();

    const dataToSend = {
      type: typeAdding,
      year: selectedYear,
      book: bookToAdd,
    };

    const response = await fetch('/addbook', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const updatedData = await response.json();
    //console.log(updatedData);
    setData(updatedData);

    if (response.ok) {
      console.log('Book added');
      setIsFormShowing(false);
      setBooksAdded(true);
    } else {
      console.log('Book not added');
      setBooksAdded(false);
    }
  };

  return (
    <>
      <div className="buttons">
        <button onClick={() => setForm('acquired')}>Add book acquired</button>
        <button onClick={() => setForm('read')}>Add book read</button>
      </div>
      {isFormShowing && (
        <form onSubmit={(e) => postBook(e)}>
          <label htmlFor="choose-year">Choose a year to add a book to:</label>
          <select
            required
            id="choose-year"
            value={selectedYear}
            onChange={(e) => selectYear(e.target.value)}
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year} data-testid={`add-${year}`}>
                {year}
              </option>
            ))}
          </select>
          {showAcquiredDropdown && (
            <>
              <label htmlFor="select-book">Select the book you've read:</label>
              <select
                required
                id="select-book"
                value={selectedBook}
                onChange={(e) => selectBook(e.target.value)}
              >
                <option value="">Select a book</option>
                {booksAcquired.map((book) => (
                  <option key={book} value={book}>
                    {book}
                  </option>
                ))}
                <option value="none">- Not acquired this year -</option>
              </select>
            </>
          )}
          {showBookInput && (
            <div>
              <label htmlFor="book">Type in title and author</label>
              <input
                value={bookToAdd}
                type="text"
                id="book"
                name="book"
                required
                onChange={(e) => setBookToAdd(e.target.value)}
              />
            </div>
          )}
          {showSubmitButton && (
            <button type="submit" className="submit-button">
              Submit book
            </button>
          )}
        </form>
      )}
      {booksAdded && <p className="book-submitted">Book submitted!</p>}
    </>
  );
}

export default AddBook;
