import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import Star from "./Star";
import Toast from "react-hot-toast";

const ReviewDetails = ({ product }: { product: any }) => {
  const url = "/api/reviewdata";
  const reviewRef = useRef(null);
  const { setShowReview, width, setWidth } = useStateContext();
  const [data, setData] = useState({
    productId: product._id,
    name: "",
    review: "",
    score: 0,
  });

  const dataHandle = (e: any) => {
    const newData: any = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const submitReview = async (e: any) => {
    e.preventDefault();
    data.score = (width / 100) * 5;
    const formData = data;

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setWidth(0);
      setShowReview(false);
      Toast.success(`Review Posted Successfully!`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="review-wrapper" ref={reviewRef}>
      <div className="review-container">
        <div className="form-title">
          <h2>Your Review</h2>
          <button
            type="button"
            className="close-button"
            onClick={() => {
              setShowReview(false);
              setWidth(0);
            }}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="product-review">
          <img
            src={urlFor(product.image[0]).url()}
            className="review-detail-image"
          />
          <div>{product.name}</div>
        </div>
        <Star num={undefined} />
        <div>
          <h4>Tell us what you think about this product.</h4>
          <p>
            If you have bad experience, please try contacting the customer
            support before posting a negative review.
          </p>
        </div>
        <form className="review-form" onSubmit={(e) => submitReview(e)}>
          <input
            onChange={(e) => dataHandle(e)}
            id="name"
            value={data.name}
            placeholder="name"
            type="text"
            maxLength={15}
            required
          />
          <textarea
            onChange={(e) => dataHandle(e)}
            id="review"
            value={data.review}
            placeholder="Write here..."
            maxLength={150}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewDetails;
