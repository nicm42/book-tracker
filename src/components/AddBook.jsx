function AddBook({ type }) {
  return (
    <form>
      <label htmlFor={type}>Add book {type}</label>
      <input type="text" id={type} name={type} />
      <button type="submit">Add book</button>
    </form>
  );
}

export default AddBook;
