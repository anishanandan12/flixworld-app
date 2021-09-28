import { Link } from "react-router-dom";
import "./pageNotFound.scss";

const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <h1>404</h1>
      <h3>Look like you're lost</h3>
      <p>the page you are looking for is not available!</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default PageNotFound;
