import { useState } from "react";
import { useGlobalContext } from "../../context";

export default function Search() {
  const [text, setText] = useState();
  const { setSearchTerm } = useGlobalContext();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text) {
      setSearchTerm(text);
    }
  };
  return (
    <header className="search-container">
      <h1>Gallery Photo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={text}
          onChange={handleChange}
          placeholder="Insert a number"
          className="form-input"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </header>
  );
}
