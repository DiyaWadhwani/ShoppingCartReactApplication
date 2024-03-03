import { useEffect, useState } from "react";
import { myFirebase } from "../models/MyFirebase";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function CartPage() {
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      const productsInCart = await myFirebase.fetchProductsInCart();
      console.log(productsInCart);
      setProductsInCart(productsInCart);
    };

    getCart();
  }, []);

  const onRemoveFromCart = async (product) => {
    console.log("Remove from Cart", product.id, product.data);
    const response = await myFirebase.removeProductsFromCart(product);
    console.log(response);
    window.location.reload();
  };

  return (
    <>
      <div className="cart-display">
        <div className="header">
          <h2>Cart</h2>
          <Link to="/">
            <FaHome className="header-icon" />
          </Link>
        </div>
        <div>
          {productsInCart && productsInCart.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            <ul>
              {productsInCart.map((product) => (
                <li className="product-display" key={product.id}>
                  <div className="product-name">
                    <strong>{product.data.productName}</strong>
                    <div className="product-price">
                      ${product.data.productPrice}
                    </div>
                  </div>
                  <div className="product-accessory">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => onRemoveFromCart(product)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
