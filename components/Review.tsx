import React from "react";
import Star from "./Star";

const Review = ({ content: { name, review, score } }: { content: any }) => {
  return (
    <div className="review-card">
      <h3>{name}</h3>
      <Star num={score} />
      <p>{review}</p>
    </div>
  );
};

export default Review;
