import React, { useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const cartButtonHandler = (event) => {
        props.onClick(true)
    }
    const ctx = useContext(CartContext);
    const numberOfCartItems = ctx.items.reduce((curNum, item) => {
        return curNum + item.amount;
    }, 0);
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;
    useEffect(() => {
        if (ctx.items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300)
        return () => {
            clearTimeout(timer);
        }
    }, [ctx.items]);
    return <button className={btnClasses} onClick={cartButtonHandler}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}
export default HeaderCartButton;