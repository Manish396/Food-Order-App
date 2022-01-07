import React, { useRef, useState } from 'react';
import classes from './Checkout.module.css';
const isEmpty = value => value.trim() === '';
const isSixChar = value => value.trim().length === 6;
const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })
    const nameInput = useRef();
    const streetInput = useRef();
    const postalInput = useRef();
    const cityInput = useRef();
    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInput.current.value;
        const enteredStreet = streetInput.current.value;
        const enteredPostal = postalInput.current.value;
        const enteredCity = cityInput.current.value;
        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalIsValid = isSixChar(enteredPostal);
        const enteredCityIsValid = !isEmpty(enteredCity);
        setFormValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            postalCode: enteredPostalIsValid
        })
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;
        if (!formIsValid) {
            return;
        }
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        })
    };
    const nameControlClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
    const postalControlClasses = `${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formValidity.city ? '' : classes.invalid}`;
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInput} />
                {!formValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInput} />
                {!formValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInput} />
                {!formValidity.postalCode && <p>Please enter a valid postal code!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInput} />
                {!formValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;