import { useState } from "react";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import Home from "./pages/Home/Home";
import Discover from "./pages/Discover/Discover";
import Search from "./pages/Search/Search";
import Navbar from "./components/Navbar/Navbar";
import SingleContent from "./pages/SingleContent/SingleContent";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Loader from "./components/Loader/Loader";
import { useSelector } from "react-redux";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
  const [theme, setTheme] = useState("light");
  const isLoading = useSelector((state) => state.isLoading);

  return (
    <div className={`app ${theme}`}>
      <Router>
        <ScrollToTop>
          <Navbar setTheme={setTheme} />
          <div className="app__content">
            <main>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/movies">
                  <Redirect to="/movies/1/all" />
                </Route>
                <Route path="/movies/:urlPage/:urlGenres">
                  <Discover media_type="movie" sectionTitle="Movies" />
                </Route>
                <Route exact path="/tv">
                  <Redirect to="/tv/1/all" />
                </Route>
                <Route path="/tv/:urlPage/:urlGenres">
                  <Discover media_type="tv" sectionTitle="TV Series" />
                </Route>
                <Route exact path="/search">
                  <Search />
                </Route>
                <Route path="/search/:urlType/:urlPage/:urlSearchText">
                  <Search />
                </Route>
                <Route path="/info/:mediaType/:mediaID">
                  <SingleContent />
                </Route>
                <Route path="" component={PageNotFound} />
              </Switch>
              {isLoading && <Loader />}
            </main>
          </div>
          <Footer />
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
