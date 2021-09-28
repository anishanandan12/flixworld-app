import "./cards.scss";
import { Link } from "react-router-dom";

import PopularityScore from "../PopularityScore/PopularityScore";
import { posterDefaultPath, posterFacePath } from "../../config";

const Cards = ({ movieData }) => {
  const movieName = movieData.media_type === "tv" ? movieData.name : movieData.title;

  return (
    <Link to={`/info/${movieData.media_type}/${movieData.id}`} className="cards__container" id={movieData.id}>
      <img
        src={`${movieData.poster_path ? posterFacePath + movieData.poster_path : posterDefaultPath}`}
        className="cards__poster"
        alt={movieData?.name || movieData?.title}
      />
      <div className="cards__info">
        <div className="cards__popularity">
          <PopularityScore popularityValue={movieData?.vote_average * 10} />
        </div>
        <p className="cards__year">{(movieData?.first_air_date || movieData?.release_date)?.substring(0, 4)}</p>
        <h3 className="cards__name">{movieName.length > 30 ? movieName.substring(0, 30) + "..." : movieName}</h3>
      </div>
    </Link>
  );
};

export default Cards;
