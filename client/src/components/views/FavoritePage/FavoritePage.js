import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";

function FavoritePage() {
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  useEffect(() => {
    fetchFavoredMovie();
  }, []);
  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoriteMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavoriteMovie(response.data.doc);
      } else {
        alert("영화 정보 갖고오는 데 실패했습니다.");
      }
    });
  };
  const removeMovie = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };
    Axios.post("/api/favorite/removeFromFavorite", variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert("리스트에서 지우는 데 실패했습니다.");
        }
      }
    );
  };
  const renderCards = favoriteMovie.map((movie, index) => {
    const content = (
      <div>
        {movie.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${movie.moviePost}`} />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover title={`${favoriteMovie.movieTitle}`}>
          <td>{movie.movieTitle}</td>
        </Popover>
        <td>{movie.movieRuntime} mins</td>
        <td>
          <button onClick={() => removeMovie(movie.movieId, movie.userFrom)}>
            Remove
          </button>
        </td>
      </tr>
    );
  });
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />
      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove from favorite</th>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
