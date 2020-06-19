import React, { useEffect, useState } from "react";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";
import { Row } from "antd";
function MovieDetail(props) {
  let movieId = props.match.params.movieId;

  const [MovieInfos, setMovieInfos] = useState([]);
  const [MovieCasts, setMovieCasts] = useState([]);
  const [castToggle, setCastToggle] = useState(false);
  const toggleCast = () => {
    setCastToggle(!castToggle);
  };
  useEffect(() => {
    let endpointCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovieInfos(response);
      });
    fetch(endpointCasts)
      .then((response) => response.json())
      .then((response) => {
        setMovieCasts(response.cast);
        console.log(response);
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
        <Favorite
          movieInfo={MovieInfos}
          movieId={movieId}
          userFrom={localStorage.getItem("userId")}
        />
        <MovieInfo movie={MovieInfos} />
        <br />
        <div
          style={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        >
          <button onClick={toggleCast}>Toggle Actor View</button>
        </div>
        {castToggle && (
          <Row gutter={[16, 16]} CastToggle>
            {MovieCasts &&
              MovieCasts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500/${cast.profile_path}`
                        : `${cast.character}`
                    }
                    characterName={cast.character}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default MovieDetail;
