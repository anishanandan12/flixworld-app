import axios from "axios";
const TMDB_KEY = process.env.REACT_APP_TMDB_API;

export const apiGetTrendingAll = async () => {
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${TMDB_KEY}`);

    return res.data.results;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const apiGetDiscoverList = async (media_type, page, genresforURL) => {
  const genres = genresforURL === "all" ? "" : genresforURL;
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/${media_type}?api_key=${TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genres}`
    );
    return res.data;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const apiGetSearchResults = async (media_type, pageNum, searchText) => {
  const type = media_type === "tv" ? media_type : "movie";
  const page = pageNum < 1 ? 1 : pageNum;
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
    );
    return res.data;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const apiGetGenreList = async () => {
  try {
    const resMovie = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_KEY}&language=en-US`
    );
    const resTv = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${TMDB_KEY}&language=en-US`);

    return { movie: resMovie.data.genres, tv: resTv.data.genres };
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const apiGetMediaInfo = async (data) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${data.media_type}/${data.media_id}?api_key=${TMDB_KEY}&language=en-US`
    );
    return res.data;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const apiGetVideoId = async (data) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${data.media_type}/${data.media_id}/videos?api_key=${TMDB_KEY}&language=en-US`
    );
    return res.data.results[0].key;
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const apiGetCredits = async (data) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${data.media_type}/${data.media_id}/credits?api_key=${TMDB_KEY}&language=en-US`
    );
    return { cast: res.data.cast.slice(0, 15), crew: res.data.crew.slice(0, 15) };
  } catch (error) {
    console.log("Error:", error.message);
  }
};

export const apiGetCertification = async (data) => {
  try {
    if (data.media_type === "tv") {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${data.media_type}/${data.media_id}/content_ratings?api_key=${TMDB_KEY}&language=en-US`
      );
      const filteredArray = res.data.results.filter((c) => c.iso_3166_1 === "US")[0].rating;
      return filteredArray;
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${data.media_type}/${data.media_id}/release_dates?api_key=${TMDB_KEY}`
      );
      const filteredArray = res.data.results.filter((c) => c.iso_3166_1 === "US")[0].release_dates;
      return filteredArray[filteredArray.length - 1].certification;
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
};
