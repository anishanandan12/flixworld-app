import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import "./home.scss";

import Section from "../../components/Section/Section";
import { apiGetTrendingAll } from "../../apiCalls";
import { getTrendingAll } from "../../redux/trendingAll/trendingAll.actions";
import { isLoadingActive, isLoadingInactive } from "../../redux/isLoading/isLoading.actions";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(isLoadingActive());
      const res = await apiGetTrendingAll();
      props.dispatchTrendingAll(res);
      setTimeout(() => {
        dispatch(isLoadingInactive());
      }, 1000);
    };
    !props.trendingAll && fetchData();
  }, [props, dispatch]);

  return (
    <div className="home common-container">
      <Section sectionTitle="Trending Movies & TV Series" sectionData={props.trendingAll} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  trendingAll: state.trendingAll,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchTrendingAll: (data) => dispatch(getTrendingAll(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
