import React, { useEffect, useState } from "react";
import { client, urlFor } from "../../lib/client";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Product } from "../../components";
import { Review } from "../../components";
import { Star } from "../../components";
import { ReviewDetails } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";

const ProductDetails = ({ product, products, reviews }) => {
  const { image, name, details, price } = product;
  const [index, Setindex] = useState(0);
  const [totalReview, setTotalReview] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const { dec, inc, qty, onAdd, setShowCart, showReview, setShowReview } =
    useStateContext();

  const location = useRouter();

  useEffect(() => {
    let a = 0;
    let score = 0;
    reviews.map((review) => {
      if (review.productId === product._id) {
        a += 1;
        score += parseInt(review.score);
      }
      let finalScore = a ? score / a : 0;

      setTotalReview(a);
      setTotalScore(finalScore);
    });
  }, [location.asPath]);

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="product-detail-image">
            <img
              src={urlFor(image && image[index])}
              width="100%"
              height="100%"
              className="product-detail-image"
              object-fit="cover"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => Setindex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <a href="#review">
              <div className="reviews-star">
                <div>
                  <Star num={totalScore} />
                </div>
                <p>
                  {totalScore.toFixed(2)} ({totalReview})
                </p>
              </div>
            </a>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShowReview(true)}
            >
              Leave a review
            </div>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={dec}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={inc}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => {
                onAdd(product, qty);
              }}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="reviews-container" id="review">
        {reviews.map((review) => {
          return review.productId === product._id ? (
            <Review key={review._id} content={review} />
          ) : (
            <></>
          );
        })}
      </div>
      <div className="maylike-products-wrapper">
        <h2>Similar Products</h2>

        <div className="maylike-products-container">
          {products
            .slice(0, 5)
            .map((item) =>
              item._id !== product._id &&
              item.tag.some((el) => product.tag.includes(el)) ? (
                <Product key={item._id} product={item} />
              ) : (
                <></>
              )
            )}
        </div>
      </div>
      {showReview && <ReviewDetails product={product} />}
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const reviewQuery = '*[_type == "review"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);
  const reviews = await client.fetch(reviewQuery);

  return {
    props: { products, product, reviews },
  };
};

export default ProductDetails;
