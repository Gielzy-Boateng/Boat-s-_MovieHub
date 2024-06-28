import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";

const MovieDetails = ({
  selectedId,
  handleClose,
  onWatchedMovies,
  watched,
}) => {
  const setWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const addUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovies = {
      title,
      year,
      imdbID: selectedId,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRating: countRef.current,
    };

    onWatchedMovies(newWatchedMovies);
    handleClose("");
  }

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState();
  const {
    Title: title,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Director: director,
    Actors: actors,
    Genre: genre,
    Released: released,
    Plot: plot,
    Year: year,
  } = movie;

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current += 1;
    },
    [userRating]
  );

  const KEY = "b4aee486";

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handleClose();
          console.log("Closing");
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handleClose]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = `Boateng's MovieHub`;
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!setWatched ? (
                <>
                  {
                    <StarRating
                      numberList={10}
                      size={24}
                      color={"gold"}
                      onSetRating={setUserRating}
                    />
                  }
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  This movie has already been rated {addUserRating}⭐ stars by
                  you
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
