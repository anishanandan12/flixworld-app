import "./popularityScore.scss";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";

const PopularityScore = ({ popularityValue, size }) => {
  const popularityColor = (percent) => {
    // const red = 0, yellow = 60, green = 120, turquoise = 180, blue = 240, pink = 300;
    const start = 0,
      end = 120;
    const a = percent / 100,
      b = (end - start) * a,
      c = b + start;

    // Return a CSS HSL string
    return "hsl(" + c + ", 100%, 50%)";
  };

  return (
    <div className={`popularityScore ${size && size}`}>
      <CircularProgressbarWithChildren
        value={popularityValue}
        styles={buildStyles({ pathColor: `${popularityColor(popularityValue)}` })}
      >
        <div className="CircularProgressbar-customText">
          {`${popularityValue}`}
          <sup>%</sup>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default PopularityScore;
