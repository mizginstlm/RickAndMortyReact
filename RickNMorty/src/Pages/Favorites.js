import React, { useState, useEffect } from "react";
import Card from "../components/Card/Card";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

const Favorites = () => {
  const [savedItems, setSavedItems] = useState(
    JSON.parse(localStorage.getItem("savedItems")) || []
  );
  const [favoritesData, setFavoritesData] = useState([]);
  const [removingItemId, setRemovingItemId] = useState(null);

  const handleSave = (id) => {
    const alreadySaved = savedItems.includes(id);
    const updatedSavedItems = alreadySaved
      ? savedItems.filter((savedId) => savedId !== id)
      : [...savedItems, id];
    setSavedItems(updatedSavedItems);
  };

  const confirmRemoval = (id) => {
    setRemovingItemId(id);
  };

  const cancelRemoval = () => {
    setRemovingItemId(null);
  };

  const removeItem = () => {
    setSavedItems(savedItems.filter((savedId) => savedId !== removingItemId));
    setRemovingItemId(null);
  };

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    const fetchFavoritesData = async () => {
      const favoritesData = [];
      for (let id of savedItems) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await response.json();
        favoritesData.push(data);
      }
      setFavoritesData(favoritesData);
    };
    fetchFavoritesData();
  }, [savedItems]);

  let display;

  if (favoritesData.length > 0) {
    display = favoritesData.map((x) => {
      let { id, image, name, status, location } = x;
      const isSaved = savedItems.includes(id);
      return (
        <div
          key={id}
          className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative "
        >
          <Link
            style={{ textDecoration: "none" }}
            key={id}
            className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
          >
            <div
              className={`${styles.card} d-flex flex-column justify-content-center`}
            >
              <img
                className={`${styles.img} img-fluid`}
                src={image}
                alt=""
              />
              <div className={`${styles.content}`}>
                <div className="fs-5 fw-bold mb-4">{name}</div>
                <div className="">
                  <div className="fs-6 fw-normal">Last Location</div>
                  <div className="fs-5">{location.name}</div>
                </div>
              </div>
            </div>
          </Link>

          <button
            className={`${styles.badge} position-absolute badge `}
            onClick={() => confirmRemoval(id)}
          >
            {isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
          </button>
        </div>
      );
    });
  } else {
    display = "No Characters Found :/";
  }

  return (
    <div className="container">
      <h1 className="text-center mb-3">Favorite Characters</h1>
      <div className="row">{display}</div>
      {removingItemId && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to remove this item?</p>
            <div>
              <button onClick={removeItem}>Yes</button>
              <button onClick={cancelRemoval}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
