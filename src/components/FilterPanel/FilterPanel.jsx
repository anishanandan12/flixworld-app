import { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./filterPanel.scss";

import { apiGetGenreList } from "../../apiCalls";
import useGenre from "../../hooks/useGenre";
import { updateGenreList } from "../../redux/genreList/genreList.actions";
import { useHistory, useParams } from "react-router";

const FilterPanel = ({ setGenresforURL, mediaType, dispatchGenreList, genreList }) => {
  const history = useHistory();
  const urlParams = useParams();
  const [filterVisibility, setFilterVisibility] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const selectedGenreforURL = useGenre(selectedGenres);
  // console.log(urlParams);

  // HANDLE FILTER PANEL TOOGLE
  const handleFilterPanelToggle = () => {
    if (!filterVisibility) {
      console.log("Set Genre from URL & Redux");
      setGenres(() => {
        const genreIdFromUrl = urlParams.urlGenres.split(",").map((value) => parseInt(value));
        const newValue = genreList[mediaType]?.filter((g) => !genreIdFromUrl.includes(g.id));
        return newValue;
      });

      setSelectedGenres(() => {
        const genreIdFromUrl = urlParams.urlGenres.split(",").map((value) => parseInt(value));
        const newValue = genreList[mediaType]?.filter((g) => genreIdFromUrl.includes(g.id));
        return newValue;
      });
    }
    setFilterVisibility(!filterVisibility);
  };

  // HANDLE FILTER RESET
  const handleFilterReset = () => {
    setSelectedGenres([]);
    setGenres(genreList[mediaType]);
  };

  // HANDLE FILTER APPLY
  const handleFilterApply = () => {
    setGenresforURL(selectedGenreforURL);
    handleFilterPanelToggle();
    history.push(
      `/${mediaType === "movie" ? "movies" : mediaType}/1/${selectedGenreforURL === "" ? "all" : selectedGenreforURL}`
    );
  };

  // HANDLE ADD GENRE
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres?.filter((g) => g.id !== genre.id));
  };

  // HANDLE REMOVE GENRE
  const handleRemove = (genre) => {
    setSelectedGenres(selectedGenres?.filter((selected) => selected.id !== genre.id));
    setGenres([...genres, genre]);
  };

  // USE EFFECT
  useEffect(() => {
    // FETCH GENRE LIST
    const fetchGenreList = async () => {
      if (Object.keys(genreList).length === 0) {
        console.log("Fetching Genre List");
        const res = await apiGetGenreList();
        dispatchGenreList(res);

        console.log("Set Genre from URL & Fetch");
        setGenres(() => {
          const genreIdFromUrl = urlParams.urlGenres.split(",").map((value) => parseInt(value));
          const newValue = res[mediaType]?.filter((g) => !genreIdFromUrl.includes(g.id));
          return newValue;
        });

        setSelectedGenres(() => {
          const genreIdFromUrl = urlParams.urlGenres.split(",").map((value) => parseInt(value));
          const newValue = res[mediaType]?.filter((g) => genreIdFromUrl.includes(g.id));
          return newValue;
        });
      }
    };
    fetchGenreList();
  }, [genreList, dispatchGenreList, mediaType, urlParams.urlGenres]);

  return (
    <>
      <div className={`filterPanel ${!filterVisibility && "hidden"}`}>
        <h2 className="filterPanel__heading">Filters</h2>
        <div className="filterPanel__container">
          <h3 className="filterPanel__subHeading">Select Genre</h3>
          <div className="filterPanel__content">
            {selectedGenres
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((genre) => (
                <p className="filterPanel__genre selected" key={genre?.id} onClick={() => handleRemove(genre)}>
                  {genre?.name}
                </p>
              ))}
            {genres
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((genre) => (
                <p className="filterPanel__genre" key={genre?.id} onClick={() => handleAdd(genre)}>
                  {genre?.name}
                </p>
              ))}
          </div>
          <button className="filterPanel__btn" onClick={handleFilterApply}>
            Apply
          </button>
          <button className="filterPanel__btn" onClick={handleFilterReset}>
            Reset
          </button>
        </div>
      </div>
      <div className="filterButton" onClick={handleFilterPanelToggle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-filter"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  genreList: state.genreList,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGenreList: (data) => dispatch(updateGenreList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel);
