import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const [isCheckout, setCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    const addCartItemHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    };
    const removeCartItemHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item) => {
                return (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        amount={item.amount}
                        price={item.price}
                        onRemove={removeCartItemHandler.bind(null, item.id)}
                        onAdd={addCartItemHandler.bind(null, item)}
                    />
                );
            })}
        </ul>
    );
    const closeButtonHandler = () => {
        // console.log("close Button clicked!")
        props.onClose(true);
    };
    const orderHandler = () => {
        setCheckout(true)
    }
    const userDataHandler = (userData) => {
        setIsSubmitting(true);
        console.log(userData);
        fetch('https://react-http-11fed-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearItem();
    };
    const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={closeButtonHandler}>
            Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>
    const submittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={closeButtonHandler}>
                Close
            </button>
        </div>
    </React.Fragment>
    const modalContents = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={userDataHandler} onCancel={props.onClose} />}
        {!isCheckout && modalActions}
    </React.Fragment>
    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && modalContents}
            {isSubmitting && submittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};
export default Cart;
