import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch } from "react-redux";

import SearchPanel from "../../components/SearchPanel/SearchPanel";
import Section from "../../components/Section/Section";
import Pagination from "../../components/Pagination/Pagination";

import { apiGetSearchResults } from "../../apiCalls";
import { isLoadingActive, isLoadingInactive } from "../../redux/isLoading/isLoading.actions";

const Search = () => {
  const history = useHistory();
  const { urlType, urlPage, urlSearchText } = useParams();
  const [mediaType, setMediaType] = useState(urlType);
  const [content, setContent] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSearchResults = async () => {
      dispatch(isLoadingActive());
      const res = await apiGetSearchResults(urlType, urlPage, urlSearchText);
      const updatedData = await res.results.map((d) => {
        return { ...d, media_type: urlType };
      });

      if (urlPage > res.total_pages) {
        history.push(`/search/${urlType}/${res.total_pages}/${urlSearchText}`);
      } else if (urlPage < 1 && res.total_pages > 0) {
        history.push(`/search/${urlType}/1/${urlSearchText}`);
      }

      setContent(updatedData);
      setTotalPages(res.total_pages);

      setTimeout(() => {
        dispatch(isLoadingInactive());
      }, 1000);
    };

    if (urlSearchText) {
      fetchSearchResults();
    }
  }, [urlSearchText, urlType, urlPage, history, setContent, setTotalPages, dispatch]);

  return (
    <div className="common-container">
      <div className="search">
        <SearchPanel
          mediaType={mediaType || "movie"}
          setMediaType={setMediaType}
          setContent={setContent}
          setTotalPages={setTotalPages}
          urlType={urlType}
          urlPage={urlPage}
          urlSearchText={urlSearchText}
        />
        {urlPage > 0 ? (
          <>
            <Section sectionTitle="Search Results" filter sectionData={content} />
            <Pagination
              page={parseInt(urlPage > totalPages ? totalPages : urlPage)}
              totalPages={totalPages}
              urlSearchText={urlSearchText}
              type={mediaType}
            />
          </>
        ) : (
          urlPage === "0" && <h4 style={{ textAlign: "center" }}>Record Not Found!</h4>
        )}
      </div>
    </div>
  );
};

export default Search;
