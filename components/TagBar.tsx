import Link from "next/link";
import React from "react";
import { AiOutlineRight } from "react-icons/ai";

const Tag = ({ product }: { product: string }) => {
  return (
    <Link href={`/browse/${product}`}>
      <div className="tag-list">
        {product}
        <p>
          <AiOutlineRight />
        </p>
      </div>
    </Link>
  );
};

export default Tag;
