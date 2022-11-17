import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({
  product: { image, name, slug, price },
}: {
  product: any;
}) => {
  return (
    <div>
      <Link href={`/product/${slug?.current}`}>
        <div className="product-card">
          <div className="product-image-wrap">
            <img
              src={urlFor(image && image[0]).url()}
              width={250}
              height={300}
              className="product-image"
            />
          </div>
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
