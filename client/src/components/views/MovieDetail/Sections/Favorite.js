import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "antd";
function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrom_path;
  const movieRuntime = props.movieInfo.runtime;
  let variables = {
    userFrom,
    movieId,
    movieRuntime,
    movieTitle,
    moviePost,
  };
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);
  useEffect(() => {
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
  }, []);
  const onClickFavorite = () => {
    if (favorited) {
      Axios.post("/api/favorite/removeFromFavorite", variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(favoriteNumber - 1);
            setFavorited(!favorited);
          } else {
            alert("favorite 리스트에서 지우는 걸 실패했습니다.");
          }
        }
      );
    } else {
      Axios.post("/api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(favoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert("favorite 리스트에 추가하는 걸 실패했습니다.");
        }
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button onClick={onClickFavorite}>
        {favorited ? "not Favorite" : "add to favorite"}
        {favoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
