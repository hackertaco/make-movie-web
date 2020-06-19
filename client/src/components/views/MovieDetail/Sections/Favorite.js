import React, { useEffect } from "react";
import Axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrom_path;
  const movieRuntime = props.movieInfo.runtime;

  useEffect(() => {
    let variables = {
      userFrom,
      movieId,
    };
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
      } else {
        alert("숫자 정보를 가져오는 데 실패했습니다.");
      }
    });
  });
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button>Favorite</button>
    </div>
  );
}

export default Favorite;
