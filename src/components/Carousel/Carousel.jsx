import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { noPicture, peopleFacePath } from "../../config";

import "./carousel.scss";

const Carousel = ({ heading, data }) => {
  const responsive = {
    0: { items: 2 },
    568: { items: 5 },
    1024: { items: 9 },
  };

  const items = data?.map((c) => (
    <div key={c.cast_id || c.credit_id} className="carousel__item">
      <img
        src={c.profile_path ? peopleFacePath + c.profile_path : noPicture}
        alt={c.name}
        className="carousel__itemImg"
      />
      <p className="carousel__itemName">
        <strong>{c.name}</strong>
        <br />
        <span>{c.character || c.job}</span>
      </p>
    </div>
  ));

  return (
    <div className="carousel common-container">
      <h3 className="carousel__heading">{heading}</h3>
      <div className="carousel__container">
        <AliceCarousel mouseTracking disableDotsControls responsive={responsive} items={items} />
      </div>
    </div>
  );
};

export default Carousel;
