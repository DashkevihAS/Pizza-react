import React from 'react';
import axios from 'axios';
import qs from 'qs';

import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { sortValues } from '../components/Sort';
import Categories from '../components/Categories';
import { URI_API } from '../const/const';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';


export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const {
    categoryId,
    sort,
    searchValue,
    currentPage,
  } = useSelector(state => state.filter);

  const fetchPizzas = () => {
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
  };

  React.useEffect(() => {
    // условие был ли первый рендер, чтобы при самом первом рендере
    // не вшивались в строку дефолтные параметры,
    // а только если выберем фильтра
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true; // после самого первого рендера установит true
  }, [categoryId, sort, currentPage]);

  // Если был первый рендер, то проверяем URL параметры
  // и сохраняем в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortValues.find(obj =>
        obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    // чтобы при вставке ссылки с параметрами в строке не выполнялся запрос
    // с их дефолтными значениями, а только после тогоб
    // как значения возьмутся из строки и запишутся в редакс диспатчем
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;

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

