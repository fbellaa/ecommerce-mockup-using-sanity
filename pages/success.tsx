import Link from "next/link";
import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your purchase</h2>
        <p className="email-msg">
          Please check your email inbox for the receipt.
        </p>
        <p className="description">
          Have any question? Send your email to
          <a className="email" href="mailto:ukiyo@example.com">
            ukiyo@example.com
          </a>
        </p>
        <Link href="/">
          <button type="button" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
