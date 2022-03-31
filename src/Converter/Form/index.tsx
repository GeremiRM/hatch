import "./styles.scss";

export const Form: React.FC = () => {
  const renderOptions = () => {};

  return (
    <form className="form">
      <div className="control">
        <label htmlFor="amount" className="control__label">
          Amount
        </label>
        <input
          type="text"
          name="amount"
          id="amount"
          className="control__field control__input"
        />
      </div>
      <div className="control">
        <label className="control__label">From</label>
        <select
          name="convertFrom"
          id="convertFrom"
          className="control__field control__select"
        >
          <option>EUR</option>
        </select>
      </div>
      <div className="control">
        <label className="control__label">To</label>
        <select
          name="convertFrom"
          id="convertFrom"
          className="control__field control__select"
        >
          <option>USD</option>
        </select>
      </div>
      <button type="submit" className="form__submit">
        Convert
      </button>
    </form>
  );
};
