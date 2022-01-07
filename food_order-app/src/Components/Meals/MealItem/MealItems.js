import React, { useContext } from "react";
import classes from "./MealItems.module.css";
import MealitemForm from "./MealitemForm";
import CartContext from "../../../store/cart-context";
const MealItems = (props) => {
    const price = `$${props.price.toFixed(2)}`;
    const cartctx = useContext(CartContext)
    const addToCartHandler = amount => {
        cartctx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        })
    };
    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
        </div>
        <div>
            <MealitemForm id={props.id} onAddToCart={addToCartHandler} />
        </div>
    </li>
};
export default MealItems;