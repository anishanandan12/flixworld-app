import { useState } from "react";
import { useHistory } from "react-router";

import "./searchPanel.scss";

const SearchPanel = ({ mediaType, setMediaType, urlSearchText }) => {
  const history = useHistory();
  const [inputValue, setInputValue] = useState(urlSearchText || "");

  const handleChangeSelect = (e) => {
    setMediaType(e.target.value);
  };

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      history.push(`/search/${mediaType}/1/${inputValue}`);
    }
  };

  return (
    <div className="searchPanel">
      <form className="searchPanel__form" onSubmit={handleSubmit} autoComplete="off">
        <select
          name="select_type"
          className="form-control searchPanel__select"
          value={mediaType}
          onChange={handleChangeSelect}
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Series</option>
        </select>
        <input
          type="search"
          name="input_search"
          className="form-control searchPanel__input"
          placeholder={`Search ${mediaType === "tv" ? "TV Series" : "Movies"}...`}
          onChange={handleChangeInput}
          value={inputValue}
        />
        <button type="submit" className="form-control searchPanel__btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trending-up"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchPanel;
