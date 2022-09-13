import React from 'react';
import axios from 'axios';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import { URI_API } from '../const/const';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    categoryId,
    sort,
    searchValue,
    currentPage,
  } = useSelector(state => state.filter);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(
      // eslint-disable-next-line max-len
      `${URI_API}?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then(res => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => (<Skeleton key={i}/>));

  const items = pizzas.map((pizzaObj) => (
    <PizzaBlock
      key={pizzaObj.id}
      // title={title}
      // price={price}
      // imageUrl={imageUrl}
      // sizes={sizes}
      // types={types}
      {...pizzaObj}
    />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : items
        }
      </div>
      <Pagination />
    </div>
  );
};

