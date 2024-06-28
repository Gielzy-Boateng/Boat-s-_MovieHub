import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {
  const inputFocus = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputFocus.current) return;
        if (e.code === "Enter") {
          inputFocus.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return function () {
        document.addEventListener("keydown", callback);
      };
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputFocus}
    />
  );
};

export default Search;
