import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
import CardDetails from "./CardDetails";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

const Card = ({ page, results }) => {
  const [savedItems, setSavedItems] = useState(() => {
    const savedItemsFromStorage = localStorage.getItem("savedItems");
    return savedItemsFromStorage ? JSON.parse(savedItemsFromStorage) : [];  });
    
    const handleSave = (id) => {
      const alreadySaved = savedItems.includes(id);
      const updatedSavedItems = alreadySaved
        ? savedItems.filter((savedId) => savedId !== id)
        : [...savedItems, id];
      setSavedItems(updatedSavedItems);
    };
    
    useEffect(() => {
      localStorage.setItem("savedItems", JSON.stringify(savedItems));
    }, [savedItems]);
  
    let display;

  if (results) {
    display = results.map((x) => {
      let { id, image, name, status, location } = x;
      const isSaved = savedItems.includes(id);
    

      return (
        <div
          key={id}
          className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative "
        >
        <Link
          style={{ textDecoration: "none" }}
          to={`${page}${id}`}
          key={id}
          className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
        >
          <div
            className={`${styles.card} d-flex flex-column justify-content-center`}
          >
            <img className={`${styles.img} img-fluid`} src={image} alt="" />
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
            onClick={() => handleSave(id)}
          >
                        {isSaved ? <IoBookmark /> : <IoBookmarkOutline />}
  
          </button>
        </div>
      );
    });
  } else {
    display = "No Characters Found :/";
  }

  return <>{display}</>;
};

export default Card;
