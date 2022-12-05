import React from "react";
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner, TagBar } from "../components";

const Home = ({ products, bannerData }: { products: any; bannerData: any }) => {
  let tagList: any = [];
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[1]} />
      <div className="hot-products">
        <div className="classification">
          <div className="products-heading">
            <h2>Category</h2>
          </div>
          <div className="tags-container">
            {products?.map((product: any) => {
              product.tag.map((tag: string) =>
                !tagList.includes(tag) && tag !== "hot" ? (
                  tagList.push(tag)
                ) : (
                  <></>
                )
              );
            })}
            {tagList?.slice(0, 12).map((tag: string) => (
              <TagBar key={tagList.indexOf(tag)} product={tag} />
            ))}
          </div>
        </div>
        <div>
          <div className="products-heading">
            <h2>All Time Favorite</h2>
            <p>Cozy and warm sweaters for winter</p>
          </div>
          <div className="products-container">
            {products?.map((product: any) => {
              return product.tag.includes("hot") ? (
                <>
                  <Product key={product._id} product={product} />
                </>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
      <div className="general-products">
        <div className="products-heading">
          <h2>You May Also Like</h2>
          <p>Look good all year round</p>
        </div>
        <div className="products-container">
          {products?.map((product: any) => {
            return product.tag.includes("hot") ? (
              <></>
            ) : (
              <Product key={product._id} product={product} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
