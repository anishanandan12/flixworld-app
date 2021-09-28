import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";

import Section from "../../components/Section/Section";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Pagination from "../../components/Pagination/Pagination";

import { apiGetDiscoverList } from "../../apiCalls";
import { isLoadingActive, isLoadingInactive } from "../../redux/isLoading/isLoading.actions";

const Discover = ({ media_type, sectionTitle }) => {
  const { urlPage, urlGenres } = useParams();
  const [totalPages, setTotalPages] = useState(1);
  const [content, setContent] = useState([]);
  const [genresforURL, setGenresforURL] = useState(urlGenres);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(isLoadingActive());
      console.log(`Fetching Discover ${media_type} List...`);

      if (urlGenres === "all") {
        setGenresforURL(urlGenres);
      }

      const res = await apiGetDiscoverList(media_type, urlPage, urlGenres);
      const updatedData = await res.results.map((d) => {
        return { ...d, media_type: media_type };
      });
      setContent(updatedData);
      setTotalPages(res.total_pages);

      setTimeout(() => {
        dispatch(isLoadingInactive());
      }, 1000);
    };

    fetchData();
  }, [media_type, urlPage, urlGenres, genresforURL, dispatch]);

  return (
    <div className="common-container">
      <FilterPanel setGenresforURL={setGenresforURL} urlGenres={urlGenres} mediaType={media_type} />
      <Section sectionTitle={`Discover ${sectionTitle}`} filter sectionData={content} />
      <Pagination
        page={parseInt(urlPage)}
        totalPages={totalPages}
        genresforURL={genresforURL}
        type={media_type === "movie" ? "movies" : media_type}
      />
    </div>
  );
};

export default Discover;
