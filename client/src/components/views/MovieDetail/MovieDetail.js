import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [MovieInfos, setMovieInfos] = useState([]);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovieInfos(response);
      });
  }, []);
  return (
    <div>
      <MainImage
        img={`${IMAGE_BASE_URL}w1280/${MovieInfos.backdrop_path}`}
        title={MovieInfos.original_title}
        text={MovieInfos.overview}
      />
      <div style={{ width: "85%", margin: "1rem auto" }}>
        <MovieInfo movie={MovieInfos} />
        <br />
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button>Toggle Actor View</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
