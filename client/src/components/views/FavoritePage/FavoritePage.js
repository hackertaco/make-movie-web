import React, { useEffect, useState } from "react";
import "./favorite.css";
import Axios from "axios";
function FavoritePage() {
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  useEffect(() => {
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
  }, []);
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
        <tbody>
          {favoriteMovie.map((movie, index) => (
            <tr key={index}>
              <td>{movie.movieTitle}</td>
              <td>{movie.movieRuntime} mins</td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
