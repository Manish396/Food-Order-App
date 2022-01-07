import React, { useEffect, useState } from "react";
import classes from "./AvailableMeal.module.css";
import MealItems from "./MealItem/MealItems";
import Card from "../UI/Card/Card";
const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [httpError, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      const response = await fetch('https://react-http-11fed-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };
    try {
      fetchMeals();
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }, []);
  if (isLoading) {
    return <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if (httpError) {
    return (
      <section className={classes.mealsHttpError}>
        <p>{httpError}</p>
      </section>
    );
  }
  const dummyMeals = meals.map((meal) => (
    <MealItems
      id={meal.id}
      key={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{dummyMeals}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeal;
