import "./singleContent.scss";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";

import Carousel from "../../components/Carousel/Carousel";
import PopularityScore from "../../components/PopularityScore/PopularityScore";

import { updateMovieList, updateTvList } from "../../redux/mediaList/mediaList.actions";
import { isLoadingActive, isLoadingInactive } from "../../redux/isLoading/isLoading.actions";
import { apiGetCertification, apiGetCredits, apiGetMediaInfo, apiGetVideoId } from "../../apiCalls";
import { backdropImgPath, backdropImgPathMobile, posterBestPath, posterDefaultPath } from "../../config";

const SingleContent = (props) => {
  const { mediaType, mediaID } = useParams();
  const [mediaInfo, setMediaInfo] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // HANDLE WINDOW RESIZE
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // SET RUNTIME FORMAT
  const runtime = mediaInfo?.runtime;
  const runtimeHours = Math.floor(runtime / 60);
  const runtimeMinutes = runtime % 60;

  // useEffect
  useEffect(() => {
    // FETCH DATA
    const fetchData = async (data) => {
      dispatch(isLoadingActive());

      console.log("Fetching Data");
      const resMediaInfo = await apiGetMediaInfo(data);
      const resCertification = await apiGetCertification(data);
      const resCredits = await apiGetCredits(data);
      const resVideoId = await apiGetVideoId(data);

      const mergeData = {
        ...resMediaInfo,
        certification: resCertification,
        videoId: resVideoId,
        cast: resCredits.cast,
        crew: resCredits.crew,
      };

      setMediaInfo(mergeData);
      if (mediaType === "tv") {
        props.dispatchTvList(mergeData);
      } else {
        props.dispatchMovieList(mergeData);
      }

      setTimeout(() => {
        dispatch(isLoadingInactive());
      }, 1000);
    };

    // MOUNT CURRENT MEDIA INFO TO STATE
    const mountMediaInfo = (type, id) => {
      const searchID = parseInt(id);
      const arrIndex = props.mediaList[type].findIndex((el) => el.id === searchID);

      if (arrIndex === -1) {
        fetchData({ media_type: mediaType, media_id: mediaID });
      } else {
        setMediaInfo(props.mediaList[type][arrIndex]);
      }
    };

    mountMediaInfo(mediaType, mediaID);
    window.addEventListener("resize", handleResize);

    return () => {
      setMediaInfo(null);
    };
  }, [mediaID, mediaType, props, dispatch]);

  return (
    <div className="singleContentInfo">
      <button className="singleContentInfo__backBtn" onClick={() => history.goBack()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span> Back</span>
      </button>
      <section className="singleContentInfo__banner">
        <div
          className="singleContentInfo__backdrop"
          style={{
            backgroundImage: `url(${
              mediaInfo?.backdrop_path && isMobile
                ? backdropImgPathMobile + mediaInfo.backdrop_path
                : mediaInfo?.backdrop_path && !isMobile
                ? backdropImgPath + mediaInfo.backdrop_path
                : ""
            })`,
          }}
        >
          <div className="singleContentInfo__backdropFadeLeft"></div>
          <div className="singleContentInfo__backdropFadeBottom"></div>
        </div>
        <div className="singleContentInfo__container common-container">
          <div className="singleContentInfo__poster">
            <img
              src={mediaInfo?.poster_path ? posterBestPath + mediaInfo.poster_path : posterDefaultPath}
              alt={mediaInfo?.name || mediaInfo?.title}
            />
          </div>
          <div className="singleContentInfo__detailsWrapper">
            <div className="singleContentInfo__details">
              <div className="singleContentInfo__head">
                <div className="singleContentInfo__popularity">
                  <PopularityScore size="md" popularityValue={mediaInfo?.vote_average * 10} />
                </div>
                <h2 className="singleContentInfo__name">
                  <span>
                    <strong>{mediaInfo?.name || mediaInfo?.title}</strong> [
                    {(mediaInfo?.first_air_date || mediaInfo?.release_date || "----")?.substring(0, 4)}]
                  </span>
                  {mediaInfo?.certification !== "" && (
                    <code className="singleContentInfo__certification">{mediaInfo?.certification}</code>
                  )}
                </h2>
              </div>
              <p className="singleContentInfo__tagline">
                <em>{mediaInfo?.tagline}</em>
              </p>
              <h3 className="singleContentInfo__overviewHeading">Overview</h3>
              <p className="singleContentInfo__overviewContent">{mediaInfo?.overview}</p>
              <div className="singleContentInfo__fact">
                <p className="singleContentInfo__factContent">
                  <strong>Genres</strong>
                  <span>{mediaInfo?.genres.map((g) => g.name).join(", ")}</span>
                </p>
                {mediaType !== "tv" && (
                  <p className="singleContentInfo__factContent">
                    <strong>Release Date</strong>
                    <span>{mediaInfo?.release_date}</span>
                  </p>
                )}
                {mediaType === "tv" && (
                  <p className="singleContentInfo__factContent">
                    <strong>Number of Seasons</strong>
                    <span>{mediaInfo?.number_of_seasons}</span>
                  </p>
                )}
                {mediaType === "tv" && (
                  <p className="singleContentInfo__factContent">
                    <strong>Status</strong>
                    <span>{mediaInfo?.status}</span>
                  </p>
                )}
                {mediaType === "tv" && (
                  <p className="singleContentInfo__factContent">
                    <strong>Networks</strong>
                    <span>{mediaInfo?.networks.map((n) => n.name).join(", ")}</span>
                  </p>
                )}
                {mediaType !== "tv" && (
                  <p className="singleContentInfo__factContent">
                    <strong>Runtime</strong>
                    <span>
                      {runtimeHours}h {runtimeMinutes}m
                    </span>
                  </p>
                )}
              </div>
              <div className="singleContentInfo__cta">
                <a
                  href={mediaInfo?.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="singleContentInfo__ctaBtn"
                >
                  Visit Site
                </a>
                <a
                  href={`https://www.youtube.com/watch?v=${mediaInfo?.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="singleContentInfo__ctaBtn"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {mediaInfo?.cast.length > 0 && (
        <section className="singleContentInfo__slider">
          <Carousel heading="Top Casts" data={mediaInfo?.cast} />
        </section>
      )}
      {mediaInfo?.crew.length > 0 && (
        <section className="singleContentInfo__slider">
          <Carousel heading="Top Crews" data={mediaInfo?.crew} />
        </section>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  mediaList: state.mediaList,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchMovieList: (data) => dispatch(updateMovieList(data)),
  dispatchTvList: (data) => dispatch(updateTvList(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleContent);
