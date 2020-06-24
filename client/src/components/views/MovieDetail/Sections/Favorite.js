import React, { useEffect, useState } from "react";
import Axios from "axios";

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrom_path;
  const movieRuntime = props.movieInfo.runtime;

  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);
  useEffect(() => {
    let variables = {
      userFrom,
      movieId,
    };
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert("숫자 정보를 가져오는 데 실패했습니다.");
      }
    });
    Axios.post("/api/favorite/favorited", variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
        console.log("favorited", response.data);
      } else {
        alert("정보를 가져오는 데 실패했습니다.");
      }
    });
  });
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button>
        {favorited ? "not Favorite" : "add to favorite"}
        {favoriteNumber}
      </button>
    </div>
  );
}

export default Favorite;
