import React from 'react';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import { URI_API } from '../const/const';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';

    fetch(`${URI_API}?${category}&sortBy=${sortBy}&order=${order}`
    )
      .then(res => res.json())
      .then(data => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setValue={(id) => setCategoryId(id)}/>
        <Sort sortType={sortType} setType ={(id) => setSortType(id)} />
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
    </div>
  );
};

