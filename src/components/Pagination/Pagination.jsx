import "./pagination.scss";

import { useState, useEffect } from "react";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import { useHistory } from "react-router";

const Pagination = ({ page, totalPages, genresforURL, type, urlSearchText }) => {
  const history = useHistory();
  const [width] = useWindowDimension();
  const [pageSetting, setPageSetting] = useState({
    startPage: 0,
    lastPage: 9,
    pageLimit: 9,
  });

  const routeUpdate = (media_type, page, valuesforURL) => {
    if (genresforURL) {
      history.push(`/${media_type === "movie" ? "movies" : media_type}/${page}/${valuesforURL}`);
    } else {
      console.log("Search Pagination");
      history.push(`/search/${media_type}/${page}/${urlSearchText}`);
    }
  };

  // HANDLE PAGE CHANGE
  const handlePageChange = (content) => {
    if (content === "First") {
      setPageSetting((prevState) => {
        const newState = { ...prevState, startPage: 0, lastPage: pageSetting.pageLimit };
        return newState;
      });
      routeUpdate(type, "1", genresforURL === "" ? "all" : genresforURL);
    } else if (content === "Last") {
      setPageSetting((prevState) => {
        const newState = { ...prevState, startPage: totalPages - pageSetting.pageLimit, lastPage: totalPages };
        return newState;
      });
      routeUpdate(type, totalPages, genresforURL === "" ? "all" : genresforURL);
    } else if (content === "Previous") {
      if (page < pageSetting.startPage + (pageSetting.pageLimit + 2) / 2) {
        if (pageSetting.startPage !== 0) {
          setPageSetting((prevState) => {
            const newState = { ...prevState, startPage: prevState.startPage - 1, lastPage: prevState.lastPage - 1 };
            return newState;
          });
        }
      }
      routeUpdate(type, page - 1, genresforURL === "" ? "all" : genresforURL);
    } else if (content === "Next") {
      if (page > pageSetting.startPage + pageSetting.pageLimit / 2) {
        if (pageSetting.lastPage !== totalPages) {
          setPageSetting((prevState) => {
            const newState = { ...prevState, startPage: prevState.startPage + 1, lastPage: prevState.lastPage + 1 };
            return newState;
          });
        }
      }
      routeUpdate(type, page + 1, genresforURL === "" ? "all" : genresforURL);
    } else {
      routeUpdate(type, content, genresforURL === "" ? "all" : genresforURL);
    }
  };

  // HANDLE CLICK
  const handleClick = (e) => {
    if (e.target.classList.contains("pagination__item")) {
      handlePageChange(e.target.textContent);
    }
  };

  // USE EFFECT
  useEffect(() => {
    if (width < 768) {
      setPageSetting((prevState) => {
        return { ...prevState, pageLimit: 5 };
      });
    }

    setPageSetting((prevState) => {
      if (page < pageSetting.pageLimit) {
        return { ...prevState, startPage: 0, lastPage: pageSetting.pageLimit };
      } else if (page > totalPages - pageSetting.pageLimit) {
        return { ...prevState, startPage: totalPages - pageSetting.pageLimit, lastPage: totalPages };
      } else {
        return { ...prevState, startPage: page - 1, lastPage: page + pageSetting.pageLimit - 1 };
      }
    });
  }, [width, totalPages, page, pageSetting.pageLimit]);

  return (
    <>
      <ul className="pagination" onClick={(e) => handleClick(e)}>
        <li className={`pagination__item ${page === 1 && "disabled"}`} value="first">
          First
        </li>
        <li className={`pagination__item ${page === 1 && "disabled"}`}>Previous</li>

        {[...Array(totalPages)]
          .map((e, i) => (
            <li key={i} className={`pagination__item ${page === i + 1 && "active"}`}>
              {i + 1}
            </li>
          ))
          .slice(pageSetting.startPage, pageSetting.lastPage)}

        <li className={`pagination__item ${page === totalPages && "disabled"}`}>Next</li>
        <li className={`pagination__item ${page === totalPages && "disabled"}`}>Last</li>
      </ul>
    </>
  );
};

export default Pagination;
