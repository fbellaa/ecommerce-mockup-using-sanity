import React from "react";
import { client } from "../../lib/client";
import { Product } from "../../components";

const tagDetails = ({ products, tag }) => {
  return (
    <>
      <div className="tag-details-container">
        <div className="products-heading">
          <h2>{tag}</h2>
          <p>Browse through the latest style in {tag} on Ukiyo Store.</p>
        </div>
        <div className="products-container">
          {products.map((item) =>
            item.tag.includes(tag) ? (
              <Product key={item._id} product={item} />
            ) : (
              <></>
            )
          )}
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "string"] {
    tag {
      current
    }
  }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      tag: product.tag,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);

  const tag = params.product;

  return {
    props: { products, tag },
  };
};

export default tagDetails;
