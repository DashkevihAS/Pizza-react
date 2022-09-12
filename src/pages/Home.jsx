import React from 'react';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import Categories from '../components/Categories';
import { URI_API } from '../const/const';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export const Home = () => {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [curentPage, setCurentPage] = React.useState(1);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      // eslint-disable-next-line max-len
      `${URI_API}?page=${curentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then(res => res.json())
      .then(data => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, curentPage]);

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
        <Categories value={categoryId} setValue={(id) => setCategoryId(id)}/>
        <Sort sortType={sortType} setType ={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? skeletons : items
        }
      </div>
      <Pagination setCurentPage={setCurentPage} />
    </div>
  );
};

