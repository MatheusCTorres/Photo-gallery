import { useGlobalContext } from "../../context";
import { BsHandThumbsUp } from "react-icons/bs";

export default function Photos() {
  const { loading, pic, selectPicture, addFavorite } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (pic.length < 1) {
    return <section className="section">
      <h4>No pic matched. Please try again.</h4>
    </section>
  }

  return (
    <section className="section-center">
      {pic.map((val, key) => {
        return (
          <article key={key} className="single-pic">
            <img src={val.photo} alt="picture" className="img" onClick={() => selectPicture(val.id)} />
            <footer>
              <h5><strong>{val.id}) </strong>{val.city}</h5>
              <button className="like-btn" onClick={() => addFavorite(val.id)}>
                <BsHandThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
}
