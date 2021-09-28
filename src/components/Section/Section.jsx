import Cards from "../Cards/Cards";
import "./section.scss";

const Section = ({ sectionTitle, sectionData }) => {
  return (
    <section className="section">
      <h2 className="section__heading">- {sectionTitle} -</h2>
      <div className="section__cardContainer">
        <div className="section__cardContainerInner">
          {sectionData?.map((data) => (
            <Cards key={data.id} movieData={data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section;
