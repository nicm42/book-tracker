function Content({ data, years }) {
  return (
    <>
      <label>
        Choose a year to see statistics for:
        <select name="selectedYear">
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default Content;
