import React, { Fragment } from 'react';
import MealsImage from "../../assets/meals.jpg";
import HeaderCartButton from './HeaderCartButton';
import classes from "./Header.module.css";
const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h2>FoodBazar</h2>
                <div className={classes.navRight}>
                    <HeaderCartButton onClick={props.onCartShow} />
                </div>
            </header>
            <div className={classes.main_image}>
                <img src={MealsImage} alt="A table full of meals." />
            </div>
        </Fragment>
    );
};
export default Header;