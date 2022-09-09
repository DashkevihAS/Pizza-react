import React from 'react';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://631afd44dc236c0b1ee931fd.mockapi.io/items')
      .then(res => res.json())
      .then(data => {
        setPizzas(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ?
          [...new Array(6)].map((_, i) => (<Skeleton key={i}/>)) :
          pizzas.map((pizzaObj) => (
            <PizzaBlock
              key={pizzaObj.id}
              // title={title}
              // price={price}
              // imageUrl={imageUrl}
              // sizes={sizes}
              // types={types}
              {...pizzaObj}
            />
          ))}
      </div>
    </>
  );
};

